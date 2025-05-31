/**
 * 🔥 DIVINE PERFORMANCE ANALYTICS ENGINE 🔥
 * Advanced performance monitoring and optimization
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  id: string;
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
  type: string;
}

class PerformanceAnalytics {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Core Web Vitals Observer
    this.setupCoreWebVitalsObserver();
    
    // Resource Timing Observer
    this.setupResourceTimingObserver();
    
    // Navigation Timing Observer
    this.setupNavigationTimingObserver();
    
    // Layout Shift Observer
    this.setupLayoutShiftObserver();
  }

  private setupCoreWebVitalsObserver() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          this.recordMetric({
            name: 'LCP',
            value: entry.startTime,
            rating: this.getLCPRating(entry.startTime),
            timestamp: Date.now(),
            id: `lcp-${Date.now()}`
          });
        });
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fidValue = entry.processingStart - entry.startTime;
          this.recordMetric({
            name: 'FID',
            value: fidValue,
            rating: this.getFIDRating(fidValue),
            timestamp: Date.now(),
            id: `fid-${Date.now()}`
          });
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }
  }

  private setupResourceTimingObserver() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.duration > 1000) { // Log slow resources
            this.logSlowResource({
              name: entry.name,
              duration: entry.duration,
              size: entry.transferSize || 0,
              type: this.getResourceType(entry.name)
            });
          }
        });
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }
  }

  private setupNavigationTimingObserver() {
    if ('PerformanceObserver' in window) {
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // Time to First Byte (TTFB)
          const ttfb = entry.responseStart - entry.requestStart;
          this.recordMetric({
            name: 'TTFB',
            value: ttfb,
            rating: this.getTTFBRating(ttfb),
            timestamp: Date.now(),
            id: `ttfb-${Date.now()}`
          });

          // First Contentful Paint (FCP)
          if (entry.loadEventEnd > 0) {
            const fcp = entry.loadEventEnd - entry.fetchStart;
            this.recordMetric({
              name: 'FCP',
              value: fcp,
              rating: this.getFCPRating(fcp),
              timestamp: Date.now(),
              id: `fcp-${Date.now()}`
            });
          }
        });
      });

      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);
    }
  }

  private setupLayoutShiftObserver() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric({
              name: 'CLS',
              value: clsValue,
              rating: this.getCLSRating(clsValue),
              timestamp: Date.now(),
              id: `cls-${Date.now()}`
            });
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }
  }

  private recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance Metric:', metric);
    }
  }

  private logSlowResource(resource: ResourceTiming) {
    console.warn('🐌 Slow Resource Detected:', {
      name: resource.name,
      duration: `${Math.round(resource.duration)}ms`,
      size: resource.size ? `${Math.round(resource.size / 1024)}KB` : 'unknown',
      type: resource.type
    });
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
    return 'other';
  }

  // Rating functions
  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getTTFBRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // Example: Send to Google Analytics, Vercel Analytics, etc.
    // gtag('event', metric.name, {
    //   value: Math.round(metric.value),
    //   metric_id: metric.id,
    //   metric_rating: metric.rating,
    // });
  }

  // Public methods
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getLatestMetric(name: string): PerformanceMetric | undefined {
    return this.metrics
      .filter(m => m.name === name)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
  }

  public getAverageMetric(name: string): number {
    const metrics = this.metrics.filter(m => m.name === name);
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length;
  }

  public generateReport(): any {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {},
      recommendations: []
    };

    // Generate metric summaries
    const metricNames = ['LCP', 'FID', 'CLS', 'TTFB', 'FCP'];
    metricNames.forEach(name => {
      const latest = this.getLatestMetric(name);
      const average = this.getAverageMetric(name);
      
      if (latest) {
        (report.metrics as any)[name] = {
          latest: latest.value,
          average: Math.round(average),
          rating: latest.rating,
          count: this.metrics.filter(m => m.name === name).length
        };
      }
    });

    return report;
  }

  public destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

// Export singleton instance
export const performanceAnalytics = new PerformanceAnalytics();

// Export class for custom instances
export { PerformanceAnalytics };
