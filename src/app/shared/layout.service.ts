import { Injectable } from '@angular/core';
declare var Helpers: any;

@Injectable({ providedIn: 'root' })
export class LayoutService {
  initMaterioLayoute() {
    setTimeout(() => {
      if (typeof Helpers !== 'undefined') {
        Helpers.init();
      }
    }, 0);
  }

  private loadedScripts: Map<string, boolean> = new Map();

  loadJsFilee(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts.get(url)) {
        // Script already loaded
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;

      script.onload = () => {
        this.loadedScripts.set(url, true);
        console.log(`Loaded script: ${url}`);
        resolve();
      };

      script.onerror = (error: any) => {
        console.error(`Error loading script: ${url}`, error);
        reject(error);
      };

      document.body.appendChild(script);
    });
  }
}
