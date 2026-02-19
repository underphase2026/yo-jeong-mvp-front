
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Google Tag Manager Tracker Component
 *
 * This component initializes GTM and pushes page views to the dataLayer on route changes.
 * It expects the GTM container to have triggers set up for 'page_view' events or History Changes.
 */
const GATracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);
    const GTM_ID = import.meta.env.VITE_GTM_ID;

    // Initialize GTM on mount
    useEffect(() => {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        if (!initialized) {
            // GTM Snippet provided by user
            (function(w: Window, d: Document, s: string, l: string, i: string) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (w as any)[l] = (w as any)[l] || [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (w as any)[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s) as HTMLScriptElement,
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                if (f && f.parentNode) {
                    f.parentNode.insertBefore(j, f);
                }
            })(window, document, 'script', 'dataLayer', GTM_ID);

            setInitialized(true);
        }
    }, [initialized]);

    // Track page view on location change
    useEffect(() => {
        if (initialized && window.dataLayer) {
            // Push page_view event to dataLayer
            // This allows GTM to trigger GA4 tags
            window.dataLayer.push({
                event: 'page_view',
                page_path: location.pathname + location.search
            });
        }
    }, [initialized, location]);

    return null;
};

// Add type definition for window.dataLayer
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}

export default GATracker;
