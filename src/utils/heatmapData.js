import seedGithub from './seedGithub.json';
import seedLeetcode from './seedLeetcode.json';

const CACHE_KEY_GITHUB = 'p5_heatmap_github_v1';
const CACHE_KEY_LEETCODE = 'p5_heatmap_leetcode_v1';
const CACHE_KEY_TIMESTAMP = 'p5_heatmap_timestamp_v1';

const USERNAME = 'TheAyushTandon';
const API_HOST = import.meta.env.VITE_API_URL || 'https://stepcode-heatmaps.onrender.com';

let inMemoryCache = null;
let activeFetchPromise = null;
const listeners = new Set();

/**
 * Synchronously retrieves initial heatmap data from localStorage or bundled seed data.
 * Guarantees zero blank/empty screen on mount.
 */
export function getInitialHeatmapData() {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  try {
    const cachedGh = localStorage.getItem(CACHE_KEY_GITHUB);
    const cachedLc = localStorage.getItem(CACHE_KEY_LEETCODE);

    if (cachedGh && cachedLc) {
      const parsedGh = JSON.parse(cachedGh);
      const parsedLc = JSON.parse(cachedLc);

      if (parsedGh?.weeks && parsedLc?.submission_calendar) {
        inMemoryCache = {
          githubData: parsedGh,
          leetcodeData: parsedLc,
          isFromCache: true,
          timestamp: Number(localStorage.getItem(CACHE_KEY_TIMESTAMP) || 0)
        };
        return inMemoryCache;
      }
    }
  } catch (err) {
    console.warn('Error reading heatmap cache from localStorage:', err);
  }

  // Fallback to high-fidelity seed data so the UI is instantly populated on first-ever visit
  inMemoryCache = {
    githubData: seedGithub,
    leetcodeData: seedLeetcode,
    isFromSeed: true,
    timestamp: Date.now()
  };

  return inMemoryCache;
}

/**
 * Subscribes a callback to receive fresh heatmap data updates when network requests resolve.
 */
export function subscribeToHeatmapUpdates(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners(data) {
  listeners.forEach((callback) => {
    try {
      callback(data);
    } catch (err) {
      console.error('Heatmap subscriber error:', err);
    }
  });
}

/**
 * Fetches latest heatmap data from the API in the background (stale-while-revalidate).
 * Deduplicates in-flight requests.
 */
export async function fetchLatestHeatmapData() {
  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      const [ghRes, lcRes] = await Promise.all([
        fetch(`${API_HOST}/api/github/heatmap/${USERNAME}`).catch((e) => {
          console.warn('GitHub heatmap fetch failed:', e);
          return null;
        }),
        fetch(`${API_HOST}/api/leetcode/heatmap/${USERNAME}`).catch((e) => {
          console.warn('LeetCode heatmap fetch failed:', e);
          return null;
        })
      ]);

      let newGhData = null;
      let newLcData = null;

      if (ghRes && ghRes.ok) {
        newGhData = await ghRes.json();
        try {
          localStorage.setItem(CACHE_KEY_GITHUB, JSON.stringify(newGhData));
        } catch (e) {
          console.warn('Failed to save GitHub cache:', e);
        }
      }

      if (lcRes && lcRes.ok) {
        const parsedLc = await lcRes.json();
        if (parsedLc && parsedLc.submission_calendar && Object.keys(parsedLc.submission_calendar).length > 0) {
          newLcData = parsedLc;
          try {
            localStorage.setItem(CACHE_KEY_LEETCODE, JSON.stringify(newLcData));
          } catch (e) {
            console.warn('Failed to save LeetCode cache:', e);
          }
        }
      }

      const current = inMemoryCache || getInitialHeatmapData();
      const updated = {
        githubData: newGhData || current.githubData,
        leetcodeData: newLcData || current.leetcodeData,
        isLatest: true,
        timestamp: Date.now()
      };

      try {
        localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
      } catch {
        // ignore
      }

      inMemoryCache = updated;
      notifyListeners(updated);
      return updated;
    } catch (err) {
      console.error('Error during heatmap background fetch:', err);
      return inMemoryCache || getInitialHeatmapData();
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}

/**
 * Starts background pre-fetching as soon as the site is launched.
 */
export function startBackgroundPrefetch() {
  // Fire background fetch immediately
  fetchLatestHeatmapData();
}

