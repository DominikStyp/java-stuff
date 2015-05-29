/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package dominik.miscTools;

import java.util.Iterator;
import java.util.Map;

public class HTML {
	
	public static final String BR = "<br />";
	
	/**
	 * Removes HTML tags from the text as in example <br />
	 * FROM:  &lt;html&gt; some text<br />&lt;p&gt;blah!&lt;/p&gt;&lt;/html&gt;<br />
	 * TO:   some text\nblah!
	 * @param html
	 * @return String
	 */
	public static String removeHTMLTags(String html){
		return html.replaceAll("<br />","\n").replaceAll("<[^>]+>","");
	}
	
	/**
	 * Wraps into HTML tags as follows: <br />
	 * FROM:  some nice text <br />
	 * TO:    &lt;html&gt;some nice text&lt;/html&gt;
	 * @return
	 */
	public static String wrapHTML(String text){
		return "<html><body>" + text + "</body></html>";
	}
	
	/**
	 * Colorizes string
	 * @param html
	 * @param color
	 * @return
	 */
	public static String colorize(String html, String color){
		return "<span style=\"color:"+ color + ";\">" + html + "</span>";
	}
	
	public static String bold(String html){
		return "<b>" + html + "</b>";
	}
	
	/**
	 * Removes HTML open and close tags from the text as follows <br />
	 * FROM:  &lt;html&gt; some &lt;b&gt;text&lt;/b&gt; &lt;/html&gt; <br />
	 * TO:    some &lt;b&gt;text&lt;/b&gt;
	 * @param text
	 * @return String
	 */
	public static String removeHTMLOpenCloseTags(String text){
		return text.replace("<html><body>","").replace("</body></html>", "");
	}
	
	/**
	 * Converts HashMap<String,String> into HTML table
	 * @param map HashMap<String,String>
	 * @param tableAttributes HTML table attributes
	 * @param th1Desc - first TH (table header) tag
	 * @param th2Desc - second TH (table header) tag
	 * @return
	 */
	public static String makeHTMLTableFromHashmap(Map<String,String> map, String tableAttributes, String th1Desc, String th2Desc){
		StringBuilder ret = new StringBuilder("<table " + tableAttributes + "><tr><th>"+ th1Desc +"</th><th>"+ th2Desc +"</th></tr>");
		Iterator<Map.Entry<String,String>> it = map.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry<String,String> pair = (Map.Entry<String,String>)it.next();
	        ret.append("<tr><td>" + pair.getKey() + "</td><td>" + pair.getValue() + "</td></tr>");
	        it.remove(); // avoids a ConcurrentModificationException
	    }
		return ret.append("</table>").toString();
	}
	
	

}
