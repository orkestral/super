"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    let task = Promise.resolve();
    return {
        mutex(code) {
            task = (async () => {
                // wait for the previous task to complete
                // if there is an error, we swallow so as to not block the queue
                try {
                    await task;
                }
                catch (_a) { }
                // execute the current task
                return code();
            })();
            // we replace the existing task, appending the new piece of execution to it
            // so the next task will have to wait for this one to finish
            return task;
        },
    };
};
