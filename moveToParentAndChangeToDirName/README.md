## Move file to parent directory and change to directory name

## What does it do?
This is simple class that can be added to your context menu in Windows.<br />
It moves certain file to an upper directory (parent directory), and changes it's name to this directory.<br />
For example: <br />
**C:/myDir/mySubDir/photo/1.jpg** ===> **C:/myDir/mySubDir/photo.jpg**

## How it works
- It gets a path from the first argument
```java
String path = args[0];
```
- Parses file path to the name, extension etc.
- Changes it's name to **parent directory name**
