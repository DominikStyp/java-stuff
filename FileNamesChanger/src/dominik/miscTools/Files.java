/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */
package dominik.miscTools;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class Files {
	
	/**
	 * Fetch ONLY files from given path, skip directories
	 * Only first level of the path is fetched
	 * Returns null if <b>pathName</b> isn't a directory
	 * @param pathName
	 * @return File[] | null
	 */
	public static File[] getFilesFromPath(String pathName){
		File directory = new File(pathName);
		if(directory.isDirectory()){
			File[] files = directory.listFiles();
			ArrayList<File> filesOnly = new ArrayList<File>();
			for(File file : files){
				if( !file.isFile() ){
					continue;
				}
				filesOnly.add(file);
			}
			//we initialize new empty array of File objects with size taken from ArrayList
			return filesOnly.toArray(new File[filesOnly.size()]);
		}
		else {
			throw new IllegalArgumentException("Path: " + pathName + " is not a directory");
		}
	}
	
	
	
	public static Map<String,String> renameFilesInSameDir(File[] files, Pattern fromPattern, Pattern toPattern, Boolean simulationOnly) throws IOException {
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
							//safety files move from one path to another
							//oldPath.resolveSibling(newName) example: oldPath = "/dir1/dir2/file1", newName = "file2", return = "/dir1/dir2/file2" 
							java.nio.file.Files.move(source, target);
					}
					map.put(source.toString(), target.toString());
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
	
	
}
