## How to add to Windows 7 context menu instruction
- Move directory **windows-context-menu-application** to **C:/**
- Go to the **C:/windows-context-menu-application** and do the following...

### Adding "Move to parent and change name" functionality to context menu
Click on **Windows7-registy-key-move-to-parent.reg** and add key to Registry.<br />
And you're able to use simple **Java Application** from your context menu in **Windows 7**.<br />
It can **move** selected file to upper directory, changing it's name to directory's name as follows:<br />
**C:/myDir/mySubDir/My-movie-with-cool-title/movie.mp4** ===> **C:/myDir/mySubDir/My-movie-with-cool-title.mp4**

### After add .reg file to Registry
And you should see new context menu option **"Move to Parent and change name"**, if you click right mouse button on every file.<br />

### Requirements
Java Runtime Environment 7 (JRE 7) installed
