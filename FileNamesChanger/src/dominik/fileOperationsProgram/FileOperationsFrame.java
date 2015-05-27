/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package dominik.fileOperationsProgram;

import static dominik.miscTools.Files.*;
import static dominik.miscTools.HTML.*;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.swing.DefaultComboBoxModel;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.border.EmptyBorder;

import dominik.miscTools.OS;
import dominik.translations.FileOperationsTranslations;
import dominik.translations.FileOperationsTranslations.AvailableLanguages;

/**
 * Class extends SaveableJFrame which implements save to disk functionality.
 * It means that child class is automatically written to java tmp directory during windowClosing event launch (frame close).
 * Object is restored from cache file (serialized object) to the state before last closing.
 * WARNING: Class have to define non-parameter constructor which is used to create instance to save/restore class from disk
 * WARNING: You have to define event listeners outside constructor body because restoring object from disk doesn't restore event listeners
 * @author Dominik
 *
 */
public class FileOperationsFrame extends SaveableJFrame implements Serializable {

	/**
	 * Common stuff used to properly save/load class from disk (serialize)
	 */
	private static FileOperationsFrame frame = null;
	protected static Class<FileOperationsFrame> classReference = FileOperationsFrame.class;
	private static final long serialVersionUID = -6622515562728595593L;
	/**
	 * Fields, buttons - GUI stuff
	 * Common stuff
	 */
	private JPanel contentPane = null;
	private JScrollPane scrollPane = null;
	private JLabel labelChoosedDirectory;
	private JLabel lblMessage = null;
	private JLabel labelRegexFrom = null;
	private JLabel labelRegexTo = null;
	private JLabel labelGiveRegex = null;
	private JLabel lblChooseLanguage = null;
	private File lastChoosedDirectory = null;
	private JTextPane textPaneRegexFrom = null;
	private JTextPane textPaneRegexTo = null;
	private JButton btnChangeFileNames = null;
	private JButton btnChooseDestinationDirectory = null;
	private JButton btnSimulateChangeFileNames = null;
	private JButton btnCopyToClipboard = null;
	private JButton btnResetToDefaults = null;
	private JCheckBox chckbxSaveStateOn = null;
	private static AvailableLanguages selectedLanguage = null;
	JComboBox<String> comboBox = null;

	//// language /////////
	private FileOperationsTranslations translations = null;
	private JButton btnExample = null;
	
	//// private constants
	private final static String replace = "#replace";
	private final static String arrow = " ==> ";

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		SaveableJFrame.classReference = classReference;
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				initFrame();
			}
		});
	}
	
	public static void initFrame(){
		try {
			frame = getFrameInstance() ;
			frame.selectLanguage(selectedLanguage); //select default language
			frame.attachListeners();
			frame.setVisible(true);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * Create the frame.
	 */
	public FileOperationsFrame() {
		//default language
		selectLanguage(selectedLanguage);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 876, 585);
		drawLayout();
	}
	
	public void drawLayout(){

		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		///////////////////// PANES ////////////////////////////////////////////
		
		//add scrollable pane
		scrollPane = new JScrollPane();
		scrollPane.setBounds(10, 206, 789, 296);
		contentPane.add(scrollPane);
		
		// label empty
		lblMessage = new JLabel();
		scrollPane.setColumnHeaderView(lblMessage);
		lblMessage.setFont(getFontObject());
		
		//regex to input pane
		textPaneRegexTo = new JTextPane();
		textPaneRegexTo.setBounds(189, 141, 200, 20);
		textPaneRegexTo.setFont(getFontObject());
		contentPane.add(textPaneRegexTo);
		
		//regex input pane
		textPaneRegexFrom = new JTextPane();
		textPaneRegexFrom.setBounds(189, 110, 200, 20);
		textPaneRegexFrom.setFont(getFontObject());
		contentPane.add(textPaneRegexFrom);
		
		/////////////////////// LABELS /////////////////////////////////////////
		
		//label 'choose directory'
		labelChoosedDirectory = new JLabel();
		labelChoosedDirectory.setBounds(10, 45, 708, 31);
		labelChoosedDirectory.setFont(new Font("Arial", Font.PLAIN, 12));
		contentPane.add(labelChoosedDirectory);
		
		//label 'regex from'
		labelRegexFrom = new JLabel();
		labelRegexFrom.setBounds(10, 110, 179, 14);
		labelRegexFrom.setFont(getFontObject());
		contentPane.add(labelRegexFrom);
		
		//label 'regex to'
		labelRegexTo = new JLabel();
		labelRegexTo.setBounds(10, 141, 179, 14);
		labelRegexTo.setFont(getFontObject());
		contentPane.add(labelRegexTo);
		
		//label 'give regex desc'
		labelGiveRegex = new JLabel();
		labelGiveRegex.setBounds(10, 87, 458, 14);
		labelGiveRegex.setFont(getFontObject());
		contentPane.add(labelGiveRegex);
		
		////////////////////// BUTTONS ////////////////////////////////////
		
		//button choose directory
		btnChooseDestinationDirectory = new JButton();
		btnChooseDestinationDirectory.setBounds(10, 11, 227, 23);
		btnChooseDestinationDirectory.setFont(getFontObject());
		contentPane.add(btnChooseDestinationDirectory);
		
		//button simulate change file name
		btnSimulateChangeFileNames = new JButton();
		btnSimulateChangeFileNames.setFont(getFontObject());
		btnSimulateChangeFileNames.setBounds(10, 172, 179, 23);
		contentPane.add(btnSimulateChangeFileNames);
		
		//button change file names
		btnChangeFileNames = new JButton();
		btnChangeFileNames.setBounds(228, 172, 161, 23);
		btnChangeFileNames.setFont(getFontObject());
		contentPane.add(btnChangeFileNames);
		
		//button copy to clipboard
		btnCopyToClipboard = new JButton();
		btnCopyToClipboard.setBounds(10, 513, 137, 23);
		btnCopyToClipboard.setFont(getFontObject());
		contentPane.add(btnCopyToClipboard);
		
		//button delete saved settings
		btnResetToDefaults = new JButton();
		btnResetToDefaults.setBounds(638, 513, 161, 23);
		btnResetToDefaults.setFont(getFontObject());
		contentPane.add(btnResetToDefaults);	
		
		chckbxSaveStateOn = new JCheckBox();
		chckbxSaveStateOn.setBounds(153, 513, 190, 23);
		chckbxSaveStateOn.setSelected(false);
		chckbxSaveStateOn.setFont(getFontObject());
		contentPane.add(chckbxSaveStateOn);
		
		comboBox = new JComboBox<String>();
		comboBox.setBounds(728, 25, 71, 20);
		comboBox.setModel(new DefaultComboBoxModel<String>( AvailableLanguages.getLanguagesArray() ));
		comboBox.setFont(getFontObject());
		contentPane.add(comboBox);
		
		lblChooseLanguage = new JLabel();
		lblChooseLanguage.setBounds(728, 11, 132, 14);
		lblChooseLanguage.setFont(getFontObject());
		contentPane.add(lblChooseLanguage);
		
		btnExample = new JButton();
		btnExample.setFont(getFontObject());
		btnExample.setBounds(247, 11, 152, 23);
		
		contentPane.add(btnExample);
		/////////////////////////// NEEDED TO BE IN OUTER METHOD DUE TO DYNAMIC TRANSLATIONS /////////////////////////
		setComponentTexts();
	}
	
	/**
	 * Setting up text for all compononents
	 * Needed to be in separate method due to dynamic translation while changing language
	 */
	public void setComponentTexts(){
		setTitle(translations.getRegexFileChanger());
		btnCopyToClipboard.setText(translations.getCopyToClipboard());
		textPaneRegexTo.setToolTipText(wrapHTML(translations.getRegexToInfo()));
		textPaneRegexFrom.setToolTipText(wrapHTML(translations.getRegexFromInfo()));
		labelRegexFrom.setText(translations.getGiveRegexFrom());
		labelRegexTo.setText(translations.getGiveRegexTo());
		labelGiveRegex.setText(translations.getBelowGiveRegexRules());
		btnChooseDestinationDirectory.setText(translations.getChooseDestinationDirectory());
		btnSimulateChangeFileNames.setToolTipText(wrapHTML(translations.getSimulateFileChangesInfo()));
		btnSimulateChangeFileNames.setText(translations.getSimulateChangeNames());
		btnChangeFileNames.setToolTipText(wrapHTML(translations.getChangeFileNamesInfo()));
		btnChangeFileNames.setText(translations.getChangeNames());
		btnCopyToClipboard.setToolTipText(wrapHTML(translations.getCopyToClipBoardInfo()));
		btnCopyToClipboard.setText(translations.getCopyToClipboard());
		btnResetToDefaults.setToolTipText(wrapHTML(translations.getResetToDefaultsInfo()));
		btnResetToDefaults.setText(translations.getDeleteSettings());
		btnExample.setText(translations.getShowExample());
		btnExample.setToolTipText(translations.getButtonShowExSettings());
		chckbxSaveStateOn.setToolTipText(wrapHTML(translations.getSaveStateCheckBoxInfo()));
		chckbxSaveStateOn.setText(translations.getSaveStateOnExit());
		lblChooseLanguage.setText(translations.getChooseLanguage());
		setDirectoryInfoLabel(translations.getSeeChoosedDirPath());
	}
	
	private void setDirectoryInfoLabel(String info){
		labelChoosedDirectory.setText(wrapHTML(bold(info)));
	}
	
	
	
	public void selectLanguage(AvailableLanguages lang){
		if(lang == null){
			lang = AvailableLanguages.English;
		}
		this.translations = new FileOperationsTranslations(lang);
	}
	  
	private Font getFontObject(){
		return new Font("Arial", Font.PLAIN, 11);
	}
	
	
	///// try read object from disk if it fails, create new instance ////////////////////
	public static FileOperationsFrame getFrameInstance(){
		return FileOperationsFrame.<FileOperationsFrame>readObjectFromDisk(classReference);
	}
	
	

	/**
	 * Method is checking if checkbox "Save state on exit" is checked
	 */
	@Override
	protected boolean isSaveObjectToDiskOnCloseTurnedOn(){
		return chckbxSaveStateOn.isSelected();
	}
	
	public void attachListeners(){
		//Add window listener
		this.removeWindowListener(this);
		this.addWindowListener(this); 

		btnCopyToClipboard.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setMessage( translations.getCopiedToClipboard() );
				OS.copyStringToClipboard( getMessage() );
				setMessage( translations.getMessageHasBeenCopied() );
			}
		});
		
		btnChooseDestinationDirectory.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				chooseDirectoryAction();
			}
		});
		
		btnChangeFileNames.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setMessage( translations.getFileNamesChanged() );
				changeFileNamesAction(false);//false => real file change
			}
		});
		
		btnSimulateChangeFileNames.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setMessage( translations.getSimulateChangeNames() );
				changeFileNamesAction(true);//true => only simulation of change with log
			}
		});
		
		
		btnExample.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setupInitialValues();
				showPlainMessage(translations.getExampleSettingsPopup());
			}
		});
		
		btnResetToDefaults.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				if( deleteSavedObject() ) {
					setMessage( translations.getPreviousSettingsRemovedFromFile().replace(replace, getObjectSavePath()) );
					setMessage( translations.getPreviousSettingsRemoved() );
					//we have to delete listener, because it's gonna save settings after windowClosing, we don't want that
					FileOperationsFrame fileOperationsFrame = (FileOperationsFrame) getInstance();
					fileOperationsFrame.removeWindowListener(fileOperationsFrame);
					resetFields();
				}
				else {
					showWarningMessage(  translations.getFileHasNotBeenRemoved().replace(replace, getObjectSavePath()) + BR + translations.getPreviousSettingsHasNotBeenRemoved() );
				}
			}
		});
		comboBox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				JComboBox<String> obj = (JComboBox<String>) arg0.getSource();
				selectedLanguage = AvailableLanguages.getByName( (String)obj.getSelectedItem() ) ;
				selectLanguage(selectedLanguage);
				setComponentTexts();
			};
		});
		
	}


	
	
	/**
	 * Opens JFileChooser to pick up directory 
	 * Sets up an instance variable lastChoosedDirectory to remember previous choice
	 */
	private void chooseDirectoryAction(){
		 	JFileChooser chooser = new JFileChooser(); 
		    chooser.setCurrentDirectory(lastChoosedDirectory == null ? new java.io.File(".") : lastChoosedDirectory);
		    chooser.setDialogTitle(translations.getChooseDirectory());
		    chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
		    //
		    // disable the "All files" option.
		    //
		    chooser.setAcceptAllFileFilterUsed(false);
		    //    
		    if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) { 
		    	File file = chooser.getSelectedFile();
		    	setDirectoryInfoLabel(file.getAbsolutePath());
				setMessage( translations.getDirChosen().replace("#replace", file.getAbsolutePath() ) );
				lastChoosedDirectory = file;
		      }
		    else {
		    	setDirectoryInfoLabel(translations.getDirHasNotBeenChosen());
		    	showWarningMessage( translations.getDirHasNotBeenChosen() );
		    	lastChoosedDirectory = null;
		    }
	}

	/**
	 * Performs action of changing file names or simulating it if @simulateOnly param is true
	 * @param simulateOnly
	 */
	private void changeFileNamesAction(boolean simulateOnly){
		String from = textPaneRegexFrom.getText();
		String to = textPaneRegexTo.getText();
		if(lastChoosedDirectory == null){
			showWarningMessage(translations.getFirstChooseDir());
			return;
		}
		if(from.length() < 1){
			showWarningMessage(translations.getRegexFieldFromNotFilled());
			return;
		}
		if(to.length() < 1){
			showWarningMessage(translations.getRegexFieldToNotFilled());
			return;
		}
		
		String absPath = lastChoosedDirectory.getAbsolutePath();
		try {
				Pattern fromPattern = Pattern.compile(from);
				Pattern toPattern = Pattern.compile(to);
				File[] files = getFilesFromPath(absPath);
				if(files.length < 1){
					setMessage(translations.getHaveNotFoundFilesInDir());
					return;
				}
				///////////////////// RENAME FILES /////////////////////////////////////////////////////////////////////
				String changeLog = getChangedFilesAsString( renameFilesInSameDir(files, fromPattern, toPattern, simulateOnly) );
				if(changeLog.length() > 0){
					setMessage( (simulateOnly ? "" : translations.getFileNamesChanged() + BR) + changeLog.toString() );
				}
				else {
					showWarningMessage( translations.getHaventFoudFilesMachedPattern() + ": " + bold(fromPattern.toString()) );
				}
		}
		catch (IOException e) {
				showErrorMessage(translations.getError() + ":" + BR + e.getMessage());
				//e.printStackTrace();
		}
		catch (PatternSyntaxException ex){
				showErrorMessage(translations.getRegexWrongPattern());
		}
		catch (IllegalArgumentException ex1) {
				showErrorMessage(translations.getFolderIsntDirectory().replace("#replace",absPath));
		}
		catch (RuntimeException ex2){
				showErrorMessage(translations.getError() + ":" + BR + ex2.getMessage());
		}
	}
	
	private String getChangedFilesAsString(Map<String,String> map){
		StringBuilder changeLog = new StringBuilder();
		Iterator<Map.Entry<String,String>> it = map.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry<String,String> pair = (Map.Entry<String,String>)it.next();
	        changeLog.append(colorize(pair.getKey(),"green")).append(arrow).append(colorize(pair.getValue(),"red")).append(BR);
	        it.remove(); // avoids a ConcurrentModificationException
	    }
		return changeLog.toString();
	}
	


	
	
	
	///////////////////// MESSAGES POP UPS ///////////////////////////////////
	private void showPlainMessage(String msg){
		JOptionPane.showMessageDialog(frame,
			     wrapHTML(msg),
			     translations.getInfo(),
			    JOptionPane.PLAIN_MESSAGE);
	}
	
	private void showWarningMessage(String msg){
		JOptionPane.showMessageDialog(frame,
			     wrapHTML(msg),
			     translations.getWarning(),
			    JOptionPane.WARNING_MESSAGE);
	}
	
	private void showErrorMessage(String msg){
		JOptionPane.showMessageDialog(frame,
			     wrapHTML(msg),
			     translations.getError(),
			    JOptionPane.ERROR_MESSAGE);
	}
	//////////////////////////////////////////////////////////////////////////
	
	/**
	 * Appends message in HTML format to JLabel 
	 * @param message
	 */
	private void setMessage(String message){
		String msg = getMessage();
		debugInfo( removeHTMLTags(msg) );
		lblMessage.setText( wrapHTML( ((msg.length() > 0) ? msg + BR : msg)  + message ) );
	}
	
	/**
	 * Gets message without &lt;html&gt;&lt;/html&gt; tags
	 * @return
	 */
	private String getMessage(){
		return removeHTMLOpenCloseTags(lblMessage.getText());
	}
	
	private static String getTestDir(){
		String curDir = getCurrentDirectory();
		return curDir + getFileSeparator() + "TEST_DIR";
	}
	
	/**
	 * Setting up example values if user clicks on Example button
	 */
	private void setupInitialValues(){
		String testDir = getTestDir();
		setDirectoryInfoLabel(testDir);
		lastChoosedDirectory = new File(testDir);
		textPaneRegexFrom.setText("sample\\w+(\\d+)\\.txt");
		textPaneRegexTo.setText("$1_sample.txt");
	}

	/**
	 * Resetting fields if user clicks on Reset button
	 */
	private void resetFields(){
		setDirectoryInfoLabel("");
		textPaneRegexFrom.setText("");
		textPaneRegexTo.setText("");
		lblMessage.setText("");
		lastChoosedDirectory = null;
		chckbxSaveStateOn.setEnabled(false);
		setMessage(translations.getFieldsHasBeenReset());
	}
}
