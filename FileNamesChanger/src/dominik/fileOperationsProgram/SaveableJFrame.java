/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */
package dominik.fileOperationsProgram;

import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Method;
import java.net.URISyntaxException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;

import javax.swing.JFrame;

/**
 * Class which implements [save to/restore from] disk functionality.
 * It means that child class is automatically written to java tmp directory during windowClosing event launch (frame close).
 * Object is restored from cache file (serialized object) to the state before last closing.
 * WARNING: You have to define event listeners outside constructor body because restoring object from disk doesn't restore event listeners
 * @author Dominik
 *
 */
public abstract class SaveableJFrame extends JFrame  implements java.io.Serializable, WindowListener {
	
	
	public static void debugInfo(Object info){
			System.out.println(info.toString());
	}
	
	///////////////////////////////// SAVING OBJECT TO DISK STUFF ////////////////////////////////////////////////////////////////////////////
	///////////////////////////////// WARNING: Remember to reattach listeners after .readObject(), because listeners aren't saved to disk ////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	protected static Class<?> classReference = SaveableJFrame.class;
	/**
	 * 
	 */
	protected static final long serialVersionUID = 1522857650210869596L;


	protected final Object getInstance(){
		return this;
	}
	
	/**
	 * We should implement this in child class to avoid file overwrite during read/save operations
	 * @return
	 */
	protected static String getObjectSavePath(){
		return System.getProperty("java.io.tmpdir") + classReference.getName() + "." + serialVersionUID + ".serialized";
	}
	
	protected final boolean deleteSavedObject(){
		String strPath = getObjectSavePath();
		Path path = (new File(strPath)).toPath();
		try {
			return Files.deleteIfExists(path);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	public static final void saveObjectToDisk(Object obj){
		// Write to disk with FileOutputStream
		try {
			FileOutputStream fOut = new FileOutputStream(getObjectSavePath());
			// Write object with ObjectOutputStream
			ObjectOutputStream objOut = new ObjectOutputStream(fOut);
			// Write object out to disk
			objOut.writeObject ( obj );
			fOut.close();
			objOut.flush();
			objOut.close();
			debugInfo("Object saved to: " + getObjectSavePath());
		} catch (Exception e) {
				e.printStackTrace();
		}
	}
	/**
	 * <T> - type variable declaration, so after that we can call: <myType>methodName()
	 * T - type variable get value
	 * @param clazz
	 * @return
	 */
	public static final <T> T readObjectFromDisk(Class<T> clazz){
		// Read from disk using FileInputStream
		FileInputStream fIn = null;
		ObjectInputStream objIn = null;
		try {
			fIn = new FileInputStream(getObjectSavePath());
			// Read object using ObjectInputStream
			objIn = new ObjectInputStream (fIn);
			// Read an object
			Object obj =  objIn.readObject();
			if(obj == null){
				obj = clazz.newInstance();
			}
			fIn.close();
			objIn.close();
			debugInfo("Object was read from disk: " + getObjectSavePath());
			//same as: return (T)obj;
			//clazz.cast(obj) means that we cast obj to type of clazz, so we cast to T 
			return clazz.cast(obj);
		} catch (Exception e) {
					//////// FILE NOT FOUND //////
					if(e instanceof FileNotFoundException){
							debugInfo("File not found: " + getObjectSavePath());
					}
					////////// SERIALIZATION ERROR //////////
					else if (e instanceof java.io.NotSerializableException){
							if(fIn != null){
								try {
									fIn.close();
								} catch(Exception e1){
									debugInfo(e1.getMessage());
									e1.printStackTrace();
								}
							}
							if(objIn != null){
								try {
									objIn.close();
								} catch(Exception e1){
									debugInfo(e1.getMessage());
									e1.printStackTrace();
								}
							}
							debugInfo("Class can't be unserialized");
							/////////// SOMETHING WRONG WITH UNSERIALIZATION ///////////
							////////// REMOVE SERIALIZED FILE WITH SERIALIZED OBJECT ///
							debugInfo("Removing badly serialized file: " + getObjectSavePath());
							//delete file if exists
							Path path = FileSystems.getDefault().getPath(getObjectSavePath());
							try {
								Files.deleteIfExists(path);
							} catch (IOException e1) {
								debugInfo(e.getMessage());
								e1.printStackTrace();
							}
							///////////////////////////////////////////////////////////
							return null;
					}
					//// SOMETHING ELSE ///////////
					else {
							e.printStackTrace();
					}
					//there is no serialized class in file so return new
					try {
						debugInfo("new class object created");
						return clazz.newInstance();
					} catch (Exception e1) {
						debugInfo(e.getMessage());
						e1.printStackTrace();
						return null;
					}
		}
		finally {
			
		}
		
	}
	
	protected boolean isSaveObjectToDiskOnCloseTurnedOn(){
		return true;
	}
	

	@Override
	public void windowActivated(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowClosed(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void windowClosing(WindowEvent arg0) {
		Class<?> clazz = getClass();
    	try {
    		// second parameter of getMethod() is .class property of Object, 
    		// because saveObjectToDisk gets Object type as first parameter
    		if(isSaveObjectToDiskOnCloseTurnedOn()){
    			Method saveObjectToDisk = clazz.getMethod("saveObjectToDisk", Object.class);
    			saveObjectToDisk.invoke(clazz, getInstance());
    		} 
    		// if method isSaveObjectToDiskOnCloseTurnedOn() returns false object will be deleted from temporary file
    		// so during next frame load there will be no restoration of previous settings
    		else {
    			deleteSavedObject();
    		}
		} catch (Exception e) {
			debugInfo(e.getMessage());
			e.printStackTrace();
		}
		
	}

	@Override
	public void windowDeactivated(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void windowDeiconified(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void windowIconified(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void windowOpened(WindowEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}
