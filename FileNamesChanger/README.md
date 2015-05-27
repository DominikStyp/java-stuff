# What is this
This is **Java program** build on **Swing** library, which allows you to **change file names in selected directory**, using defined **regular expressions**.<br />

# How it works
Use demo first: 
- Click on **Show example** to setup example **regular expression** values 
- Click **Simulate change file names** button 

To Regular usage you have to do following steps:
- Pickup directory where you wish to change your files - by **Choose destination directory** button,
- Fill fields **from** and **to** with your defined regular expressions which will gonna be used like <br />
  **String.replaceAll(from,to)** to change your file names,
- ALWAYS first click on **Simulate change file names** to see predicted result and not touch any file yet,
- If your result is as expected you can click on **Change file names** button to perform change 

# Regular Expression matching/replacing
**Java Regular Expressions** are very well described <a href="http://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">HERE</a>,<br />
so there's no need to explain it here. All that has to be told is the following:
- You can use simple string OR regular expression in both **from** and **to** fields, since program uses **replaceAll()** method from **String** class. 
- First ALWAYS run simulation instead of change (or if you're absolutely sure how your expression behaves, you can run **Change file names** button)

# Additional options
- **Copy to clipboard** button copies contents of text area with log
- **Save state on exit** checkbox allows you to turn on/off saving frame state while you exit program<br />
  it is described in **Saving frame object to disk** paragraph
- **Reset to defaults* allows you to reset all the fields including choosed directory
- **Choose language** allows you dynamically change language (English, Polish)


# Saving frame object to disk
**FileOperationsFrame** extends **SaveableJframe** which has all the functionality needed to save the object in serialized form into file.<br />
Saving to disk occures when following method returns **true** value: <br />
```java
	@Override
	protected boolean isSaveObjectToDiskOnCloseTurnedOn(){
		return chckbxSaveStateOn.isSelected(); //you can put your code here
	}
```
Save path looks similar to this (in Windows 7):<br />
**C:\Users\USER\AppData\Local\Temp\dominik.fileOperationsProgram.FileOperationsFrame.1522857650210869596.serialized**<br />


# Issues
## Messed up Swing graphics in Java Swing (Windows 7)
If you have messed up graphics in Java application window like it was mentioned <a href="http://stackoverflow.com/questions/22737535/swing-rendering-appears-broken-in-jdk-1-8-correct-in-jdk-1-7">HERE</a><br /> 
What you have to do:
- Type "Environmental variables" in search bar
- Add new variable under "System variables" named **J2D_D3D** and give it **false** value
- Restart Java Application (no system restart is needed)


