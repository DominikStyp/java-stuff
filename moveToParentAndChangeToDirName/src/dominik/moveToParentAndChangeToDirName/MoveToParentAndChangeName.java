package dominik.moveToParentAndChangeToDirName;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

public class MoveToParentAndChangeName {

	public static void main(String[] args) throws Exception {
		if(args.length < 1){
			throw new Exception("There's no path");
		}
		
		String path = args[0];
		p("Beginning path:" + path);
		//String path = "";
		String[] splittedPath = path
								.replaceAll("//","/")
								.replaceAll("\\\\\\\\","\\\\")
								.replaceAll("\\\\","/")
								.split("/");
		List<String> splittedPathList = Arrays.asList(splittedPath);
		File file = new File(path);
		String fileName = file.getName();
		String extension = getFileExtension(fileName);
		int parentDirIndex = splittedPathList.size() - 2;
		String parentDir = splittedPathList.get(parentDirIndex);
		String newFileName = parentDir + "." + extension;
		String newPath = "";
		for(int i=0; i<parentDirIndex; i++){
			newPath +=  splittedPathList.get(i) + "/";
		}
		newPath += newFileName;
		p(newPath);
		// Rename
		file.renameTo(new File(newPath));
		// Copy
		// Files.copy(file.toPath(), Paths.get(newPath), StandardCopyOption.REPLACE_EXISTING);
	}
	
	static void p(String x){
		System.out.println(x);
	}
	
	static String getFileExtension(String fileName){
		String extension = "";
		int i = fileName.lastIndexOf('.');
		if (i > 0) {
		    extension = fileName.substring(i+1);
		}
		return extension;
	}

}
