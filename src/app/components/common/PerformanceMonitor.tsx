'use client';

import { useEffect } from 'react';

/**
 * 🔥 DIVINE PERFORMANCE MONITOR 🔥
 * Real-time performance monitoring for GROW YouR NEED
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  debug?: boolean;
}

export default function PerformanceMonitor({
  enabled = process.env.NODE_ENV === 'development',
  debug = false
}: PerformanceMonitorProps) {

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Core Web Vitals monitoring
    function reportMetric(metric: PerformanceMetric) {
      if (debug && metric.rating !== 'good') {
        console.log('📊 Performance Issue:', {
          name: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating
        });
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        // Analytics integration would go here
        // gtag('event', 'web_vitals', { ...metric });
      }
    }

    // Largest Contentful Paint (LCP)
    function observeLCP() {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime;
              reportMetric({
                name: 'LCP',
                value: lcp,
                rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor',
                timestamp: Date.now()
              });
            }
          });
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        return () => observer.disconnect();
      }
    }

    // First Input Delay (FID)
    function observeFID() {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.entryType === 'first-input') {
              const fid = entry.processingStart - entry.startTime;
              reportMetric({
                name: 'FID',
                value: fid,
                rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor',
                timestamp: Date.now()
              });
            }
          });
        });

        observer.observe({ entryTypes: ['first-input'] });
        return () => observer.disconnect();
      }
    }

    // Cumulative Layout Shift (CLS)
    function observeCLS() {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });

          reportMetric({
            name: 'CLS',
            value: clsValue,
            rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
            timestamp: Date.now()
          });
        });

        observer.observe({ entryTypes: ['layout-shift'] });
        return () => observer.disconnect();
      }
    }

    // Time to First Byte (TTFB)
    function measureTTFB() {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          reportMetric({
            name: 'TTFB',
            value: ttfb,
            rating: ttfb < 600 ? 'good' : ttfb < 1500 ? 'needs-improvement' : 'poor',
            timestamp: Date.now()
          });
        }
      }
    }

    // Resource loading performance
    function observeResources() {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'resource') {
              const resource = entry as PerformanceResourceTiming;
              const loadTime = resource.responseEnd - resource.startTime;

              // Monitor slow resources
              if (loadTime > 1000) {
                if (debug) {
                  console.warn('🐌 Slow Resource:', {
                    name: resource.name,
                    loadTime: Math.round(loadTime),
                    size: resource.transferSize
                  });
                }
              }
            }
          });
        });

        observer.observe({ entryTypes: ['resource'] });
        return () => observer.disconnect();
      }
    }

    // Memory usage monitoring
    function monitorMemory() {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        };

        if (debug && memoryUsage.used > 50) {
          console.log('🧠 Memory Usage:', memoryUsage);
        }

        // Warn if memory usage is high
        if (memoryUsage.used / memoryUsage.limit > 0.8) {
          console.warn('⚠️ High memory usage detected');
        }
      }
    }

    // Initialize all observers
    const cleanupFunctions: (() => void)[] = [];

    cleanupFunctions.push(observeLCP() || (() => {}));
    cleanupFunctions.push(observeFID() || (() => {}));
    cleanupFunctions.push(observeCLS() || (() => {}));
    cleanupFunctions.push(observeResources() || (() => {}));

    // Initial measurements
    measureTTFB();

    // Memory monitoring interval (only in debug mode)
    const memoryInterval = debug ? setInterval(monitorMemory, 60000) : null; // Every 60 seconds

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      if (memoryInterval) clearInterval(memoryInterval);
    };
  }, [enabled, debug]);

  // Component doesn't render anything
  return null;
}

// Export performance utilities
export const performanceUtils = {
  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },

  // Measure performance between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, 'measure')[0];
      return measure ? measure.duration : 0;
    }
    return 0;
  },

  // Get current performance metrics
  getMetrics: () => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return null;

    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
    };
  }
};
