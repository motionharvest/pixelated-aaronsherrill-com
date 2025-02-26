export function createConsole() {
    const consoleContainer = document.createElement("div");
    consoleContainer.id = "custom-console";
    consoleContainer.style.position = "fixed";
    consoleContainer.style.bottom = "10px";
    consoleContainer.style.left = "10px";
    consoleContainer.style.width = "90vw";
    consoleContainer.style.height = "200px"; // Fixed height
    consoleContainer.style.overflowY = "auto";
    consoleContainer.style.background = "black";
    consoleContainer.style.color = "lime";
    consoleContainer.style.fontFamily = "monospace";
    consoleContainer.style.padding = "10px";
    consoleContainer.style.borderRadius = "5px";
    consoleContainer.style.fontSize = "12px";
    consoleContainer.style.zIndex = "9999";
    consoleContainer.style.whiteSpace = "pre-wrap";
    consoleContainer.style.opacity = "0.8";
    consoleContainer.style.display = "flex";
    consoleContainer.style.flexDirection = "column";
    
    document.body.appendChild(consoleContainer);

    // Minimize/restore button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Hide Console";
    toggleButton.style.position = "absolute";
    toggleButton.style.top = "5px";
    toggleButton.style.right = "10px";
    toggleButton.style.background = "black";
    toggleButton.style.color = "lime";
    toggleButton.style.border = "1px solid lime";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.fontSize = "12px";
    toggleButton.style.padding = "5px";

    document.body.appendChild(toggleButton);

    let isMinimized = false;

    toggleButton.addEventListener("click", () => {
        isMinimized = !isMinimized;
        if (isMinimized) {
            consoleContainer.style.height = "0px";
            consoleContainer.style.overflow = "hidden";
            toggleButton.textContent = "Show Console";
            
            toggleButton.style.position = "fixed";
        } else {
            consoleContainer.style.display = "flex"; // Restore flex layout
            consoleContainer.style.height = "200px"; // Ensure correct height
            consoleContainer.style.overflowY = "auto";
            toggleButton.textContent = "Hide Console";
            
        }
    });

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    function logMessage(type, color, ...args) {
        const message = args.map(arg => 
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        ).join(" ");

        const logLine = document.createElement("div");
        logLine.textContent = `${type.toUpperCase()}: ${message}`;
        logLine.style.color = color || "white"; 

        consoleContainer.insertBefore(logLine, inputContainer); // Logs go above input
        consoleContainer.scrollTop = consoleContainer.scrollHeight;
    }

    console.log = (...args) => {
        originalLog.apply(console, args);
        logMessage("log", "lime", ...args);
    };

    console.warn = (...args) => {
        originalWarn.apply(console, args);
        logMessage("warn", "yellow", ...args);
    };

    console.error = (...args) => {
        originalError.apply(console, args);
        logMessage("error", "red", ...args);
    };

    console.info = (...args) => {
        originalInfo.apply(console, args);
        logMessage("info", "cyan", ...args);
    };

    window.addEventListener("error", (event) => {
        logMessage("error", "red", `🔥 ERROR: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
    });

    window.addEventListener("unhandledrejection", (event) => {
        logMessage("error", "red", `Unhandled Promise Rejection: ${event.reason}`);
    });

    // Create command input field
    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.borderTop = "1px solid lime";
    inputContainer.style.padding = "5px";
    inputContainer.style.position = "sticky";
    inputContainer.style.bottom = "0";
    inputContainer.style.background = "black";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter JavaScript command...";
    inputField.autocapitalize = "off"; 
    inputField.autocomplete = "off";   
    inputField.spellcheck = false;      
    inputField.style.flex = "1";
    inputField.style.background = "black";
    inputField.style.color = "lime";
    inputField.style.border = "none";
    inputField.style.outline = "none";
    inputField.style.fontFamily = "monospace";
    inputField.style.padding = "5px";

    inputContainer.appendChild(inputField);
    consoleContainer.appendChild(inputContainer); // Input stays at the bottom

    const commandHistory = [];
    let historyIndex = -1;

    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = inputField.value.trim();
            if (command) {
                logMessage("command", "cyan", `> ${command}`);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                try {
                    const result = safeEval(command);
                    logMessage("result", "lime", result);
                } catch (error) {
                    logMessage("error", "red", error.message);
                }
            }
            inputField.value = "";
        } else if (event.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[historyIndex];
            }
            event.preventDefault();
        } else if (event.key === "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputField.value = "";
            }
            event.preventDefault();
        }
    });

    return consoleContainer;
}


function safeEval(code) {
    let result;
    try {
        // Prevent "RESULT:" from showing for console.log, console.warn, etc.
        if (code.startsWith("console.")) {
            new Function(`"use strict"; ${code}`)();
            return;
        }

        // Execute the code safely
        result = new Function(`"use strict"; return (${code})`)();
    } catch (error) {
        result = error.message;
    }
    return result;
}