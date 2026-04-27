import { execSync } from "child_process"

/**
 * Copy text to the system clipboard using platform-native commands.
 * Returns true on success, false if no clipboard tool is available.
 */
export const copyToClipboardNative = (text: string): boolean => {
	try {
		if (process.platform === "darwin") {
			execSync("pbcopy", { input: text, stdio: ["pipe", "ignore", "ignore"] })
		} else if (process.platform === "linux") {
			try {
				execSync("xclip -selection clipboard", { input: text, stdio: ["pipe", "ignore", "ignore"] })
			} catch {
				execSync("xsel --clipboard --input", { input: text, stdio: ["pipe", "ignore", "ignore"] })
			}
		} else if (process.platform === "win32") {
			execSync("clip", { input: text, stdio: ["pipe", "ignore", "ignore"] })
		} else {
			return false
		}
		return true
	} catch {
		return false
	}
}

/**
 * Wrap text in an OSC 8 terminal hyperlink sequence.
 * Clicking the rendered text in a supporting terminal opens `url` in the browser.
 * Falls back to displaying the plain text in terminals that do not support OSC 8.
 */
export const terminalLink = (text: string, url: string): string => {
	return `\u001b]8;;${url}\u0007${text}\u001b]8;;\u0007`
}
