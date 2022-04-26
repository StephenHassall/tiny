/**
 * Global service class. This is used by all 3 views to hold global variables.
 */ 
export default class GlobalService {
    // All global service parts must be static
    static globalCount = 0;

    /**
     * Add to the global count.
     */
    static addGlobalCount() {
        // Increase the global count
        GlobalService.globalCount++;
    }

    /**
     * Minus from the global count.
     */
    static minusGlobalCount() {
        // Decrease the global count
        GlobalService.globalCount--;
    }
}

