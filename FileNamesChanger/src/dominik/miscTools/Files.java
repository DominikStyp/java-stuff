/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */
package dominik.miscTools;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.FalseFileFilter;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;

import java.util.Arrays;

public class Files {
	
	
	
	
	public static void main(String[] args){
		File[] files = getFilesFromPathRecursive("./TEST_DIR");
		File[] files1 = getFilesFromPath("./TEST_DIR");
		System.out.println(Arrays.toString(files));
		System.out.println(Arrays.toString(files1));
	}
	
	

	
	/***
	 * Searches files that match regular expression 'toPattern' and changes them to 'toPattern'
	 * 
	 * @param files - files to be changed
	 * @param fromPattern - search files pattern
	 * @param toPattern - change to pattern
	 * @param simulationOnly - is this only simulation instead of real change, TRUE means that real files won't be touched
	 * @param returnAbsolutePaths - is returned map filled with absolute paths to files, or just file names
	 * @return - HashMap<String,String> containing path pairs [FROM,TO]
	 * @throws IOException
	 */
	public static Map<String,String> renameMachedFiles(File[] files, Pattern fromPattern, Pattern toPattern, boolean simulationOnly,  boolean returnAbsolutePaths) throws IOException {
		String strFrom = fromPattern.toString();
		String strTo = toPattern.toString();
		Map<String,String> map = new HashMap<String,String>();
		for(File file : files){
			if(file.isFile()){
				Path source = file.toPath();
				String oldName = file.getName();
				if(oldName.matches(strFrom) || oldName.contains(strFrom)){
					String newName = oldName.replaceAll(strFrom, strTo);
					Path target = source.resolveSibling(newName);
					if(!simulationOnly){ 
							java.nio.file.Files.move(source, target);
					}
					if(returnAbsolutePaths){
							map.put(source.toString(), target.toString());
					} else {
							map.put(source.getFileName().toString(), target.getFileName().toString());
					}
				}
			}
		}
		return map;
	}
	
	
	
	
	/**
	 * Returns current directory 
	 * @return
	 */
	public static String getCurrentDirectory(){
		return System.getProperty("user.dir");
	}
	
	/**
	 * Returns system path separator
	 * @return
	 */
	public static String getFileSeparator(){
		return System.getProperty("file.separator");
	}
	
	
	/**
	 * Fetch ONLY files from given path, skip directories
	 * Only first level of the path is fetched
	 * Returns null if <b>pathName</b> isn't a directory
	 * @param pathName
	 * @return File[] | null
	 */
	
	public static File[] getFilesFromPath(String pathName){
		return getFilesFromPath(pathName, false);
	}
	
	/**
	 * List files in selected directory, recursive
	 * @param pathName
	 * @return File[] | null
	 */
	public static File[] getFilesFromPathRecursive(String pathName){
		return getFilesFromPath(pathName, true);
	}
	
	
	/**
	 * 
	 * @param pathName
	 * @param recursive
	 * @return
	 */
	private static File[] getFilesFromPath(String pathName, boolean recursive){
		File directory = new File(pathName);
		if(directory.isDirectory()){
			IOFileFilter filter = (recursive) ? TrueFileFilter.INSTANCE : FalseFileFilter.INSTANCE;
			Collection<File> files = FileUtils.listFiles(directory, TrueFileFilter.INSTANCE, filter);
			return files.toArray(new File[files.size()]);
		}
		else {
			throw new IllegalArgumentException("Path: " + pathName + " is not a directory");
		}
	}
	
	
}
