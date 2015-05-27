package dominik.miscTools;

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
		return "<html>" + text + "</html>";
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
		return text.replace("<html>","").replace("</html>", "");
	}

}
