package dominik.miscTools;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;

public class OS {
		/**
		 * Copy text to clipboard
		 * @param string
		 */
		public static void copyStringToClipboard(String string){
			Toolkit toolkit = Toolkit.getDefaultToolkit();
			Clipboard clipboard = toolkit.getSystemClipboard();
			StringSelection strSel = new StringSelection(string);
			clipboard.setContents(strSel, null);
		}
}
