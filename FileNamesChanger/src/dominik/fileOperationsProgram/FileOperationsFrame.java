/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package dominik.fileOperationsProgram;

import static dominik.miscTools.Files.*;
import static dominik.miscTools.HTML.*;

import java.awt.Button;
import java.awt.Dimension;
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
import javax.swing.JEditorPane;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.ScrollPaneConstants;
import javax.swing.border.EmptyBorder;
import javax.swing.text.BadLocationException;




import javax.swing.SizeRequirements;
import javax.swing.text.Element;
import javax.swing.text.View;
import javax.swing.text.ViewFactory;
import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.InlineView;
import javax.swing.text.html.ParagraphView;


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

	
	////////////////// STATIC //////////////////////////////////
	/**
	 * Common stuff used to properly save/load class from disk (serialize)
	 */
	private static FileOperationsFrame frame = null;
	protected static Class<FileOperationsFrame> classReference = FileOperationsFrame.class;
	private static final long serialVersionUID = -6622515562728595593L;
	private static AvailableLanguages selectedLanguage = null;
	private final static String replace = "#replace";
	private final static String css = " td, th { background: white; } ";
	private final static String tableAttributes =" cellspacing=\"1\" border=\"0\" cellpadding=\"2\" style=\"background-color: black;\" ";
	private static final String textAreaInitialHTML = "<html><head><style> " + css + "</style></head><body></body></html>";
	/// Example button sets up following values
	private static final String sampleRegexFrom = "sample\\w+(\\d+)\\.txt";
	private static final String sampleRegexTo = "$1_sample.txt";
	private static final String sampleDirectory = getCurrentDirectory() + getFileSeparator() + "TEST_DIR";
	
	//for debugging only
	private static boolean debuggingModeOn = false;
	
	/**
	 * Fields, buttons - GUI stuff
	 * Common stuff
	 */
	private JPanel contentPane = null;
	private JScrollPane scrollPane = null;
	private JLabel choosedDirectoryLabel;
	private JLabel regexFromLabel = null;
	private JLabel regexToLabel = null;
	private JLabel giveRegexLabel = null;
	private JLabel chooseLanguageLabel = null;
	private File lastChoosedDirectory = null;
	private JTextPane regexFrom = null;
	private JTextPane regexTo = null;
	private JButton buttonChangeFileNames = null;
	private JButton buttonChooseDestinationDirectory = null;
	private JButton buttonSimulateChangeFileNames = null;
	private JButton buttonCopyToClipboard = null;
	private JButton buttonResetToDefaults = null;
	private JCheckBox checkboxSaveStateOn = null;
	private JCheckBox checkboxRecursiveSearch = null;
	private JEditorPane textArea = null;
	private JCheckBox checkboxShowFullPath = null;
	private JButton buttonClear = null;
	private JComboBox<String> comboBox = null;
	private JButton buttonExample = null;

	//// language /////////
	private FileOperationsTranslations translations = null;

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
	
	///// try read object from disk if it fails, create new instance ////////////////////
	public static FileOperationsFrame getFrameInstance(){
		return FileOperationsFrame.<FileOperationsFrame>readObjectFromDisk(classReference);
	}
	
	private static void initFrame(){
		try {
			frame = getFrameInstance() ;
			frame.selectLanguage(selectedLanguage); //select default language
			frame.attachListeners();
			frame.setVisible(true);

			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void drawLayout(){

		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
		///////////////////// PANES ////////////////////////////////////////////
		
		//add scrollable pane
		scrollPane = new JScrollPane();
		scrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		scrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS);
		scrollPane.setBounds(10, 206, 840, 300);
		contentPane.add(scrollPane);
		
		//////////// PANE WITH HTML ////////////////////////////
		
		///////////////////////// MAIN TEXTAREA //////////////////////////
		///////////////////////// MAIN TEXTAREA //////////////////////////
		///////////////////////// MAIN TEXTAREA //////////////////////////
		///////////////////////// MAIN TEXTAREA //////////////////////////
		textArea = new JEditorPane();
		textArea.setEditable(false);
		textArea.setFont(new Font("Arial", Font.PLAIN, 9));
		// Java7 JEditorPane has known line wrapping issue, that has to be fixed using custom editor kit
		textArea.setEditorKit(new CustomEditorKit());
		textArea.setContentType("text/html");
		textArea.setText(textAreaInitialHTML);
		scrollPane.setViewportView(textArea);
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////
		
		//regex to input pane
		regexTo = new JTextPane();
		regexTo.setBounds(189, 141, 200, 20);
		regexTo.setFont(getFontObject());
		contentPane.add(regexTo);
		
		//regex input pane
		regexFrom = new JTextPane();
		regexFrom.setBounds(189, 110, 200, 20);
		regexFrom.setFont(getFontObject());
		contentPane.add(regexFrom);
		
		/////////////////////// LABELS /////////////////////////////////////////
		
		//label 'choose directory'
		choosedDirectoryLabel = new JLabel();
		choosedDirectoryLabel.setBounds(10, 45, 708, 31);
		choosedDirectoryLabel.setFont(new Font("Arial", Font.PLAIN, 12));
		contentPane.add(choosedDirectoryLabel);
		
		//label 'regex from'
		regexFromLabel = new JLabel();
		regexFromLabel.setBounds(10, 110, 179, 14);
		regexFromLabel.setFont(getFontObject());
		contentPane.add(regexFromLabel);
		
		//label 'regex to'
		regexToLabel = new JLabel();
		regexToLabel.setBounds(10, 141, 179, 14);
		regexToLabel.setFont(getFontObject());
		contentPane.add(regexToLabel);
		
		//label 'give regex desc'
		giveRegexLabel = new JLabel();
		giveRegexLabel.setBounds(10, 87, 458, 14);
		giveRegexLabel.setFont(getFontObject());
		contentPane.add(giveRegexLabel);
		
		////////////////////// BUTTONS ////////////////////////////////////
		
		//button choose directory
		buttonChooseDestinationDirectory = new JButton();
		buttonChooseDestinationDirectory.setBounds(10, 11, 227, 23);
		buttonChooseDestinationDirectory.setFont(getFontObject());
		contentPane.add(buttonChooseDestinationDirectory);
		
		//button simulate change file name
		buttonSimulateChangeFileNames = new JButton();
		buttonSimulateChangeFileNames.setFont(getFontObject());
		buttonSimulateChangeFileNames.setBounds(10, 172, 179, 23);
		contentPane.add(buttonSimulateChangeFileNames);
		
		//button change file names
		buttonChangeFileNames = new JButton();
		buttonChangeFileNames.setBounds(228, 172, 161, 23);
		buttonChangeFileNames.setFont(getFontObject());
		contentPane.add(buttonChangeFileNames);
		
		//button copy to clipboard
		buttonCopyToClipboard = new JButton();
		buttonCopyToClipboard.setBounds(10, 513, 137, 23);
		buttonCopyToClipboard.setFont(getFontObject());
		contentPane.add(buttonCopyToClipboard);
		
		//button delete saved settings
		buttonResetToDefaults = new JButton();
		buttonResetToDefaults.setBounds(689, 513, 161, 23);
		buttonResetToDefaults.setFont(getFontObject());
		contentPane.add(buttonResetToDefaults);	
		
		checkboxSaveStateOn = new JCheckBox();
		checkboxSaveStateOn.setBounds(493, 513, 190, 23);
		checkboxSaveStateOn.setSelected(false);
		checkboxSaveStateOn.setFont(getFontObject());
		contentPane.add(checkboxSaveStateOn);
		
		comboBox = new JComboBox<String>();
		comboBox.setBounds(728, 25, 71, 20);
		comboBox.setModel(new DefaultComboBoxModel<String>( AvailableLanguages.getLanguagesArray() ));
		comboBox.setFont(getFontObject());
		contentPane.add(comboBox);
		
		chooseLanguageLabel = new JLabel();
		chooseLanguageLabel.setBounds(728, 11, 132, 14);
		chooseLanguageLabel.setFont(getFontObject());
		contentPane.add(chooseLanguageLabel);
		
		buttonExample = new JButton();
		buttonExample.setFont(getFontObject());
		buttonExample.setBounds(247, 11, 152, 23);
		contentPane.add(buttonExample);
		
		checkboxRecursiveSearch = new JCheckBox();
		checkboxRecursiveSearch.setFont(getFontObject());
		checkboxRecursiveSearch.setBounds(395, 172, 161, 23);
		contentPane.add(checkboxRecursiveSearch);
		
		checkboxShowFullPath = new JCheckBox();
		checkboxShowFullPath.setFont(getFontObject());
		checkboxShowFullPath.setSelected(true);
		checkboxShowFullPath.setBounds(395, 146, 161, 23);
		contentPane.add(checkboxShowFullPath);
		
		buttonClear = new JButton();
		buttonClear.setBounds(157, 513, 180, 23);
		buttonClear.setFont(getFontObject());
		contentPane.add(buttonClear);
		/////////////////////////// NEEDED TO BE IN OUTER METHOD DUE TO DYNAMIC TRANSLATIONS /////////////////////////
		setComponentTexts();
	}
	
	/**
	 * Setting up text for all compononents
	 * Needed to be in separate method due to dynamic translation while changing language
	 */
	private void setComponentTexts(){
		setTitle(translations.getRegexFileChanger());
		buttonCopyToClipboard.setText(translations.getCopyToClipboard());
		regexTo.setToolTipText(wrapHTML(translations.getRegexToInfo()));
		regexFrom.setToolTipText(wrapHTML(translations.getRegexFromInfo()));
		regexFromLabel.setText(translations.getGiveRegexFrom());
		regexToLabel.setText(translations.getGiveRegexTo());
		giveRegexLabel.setText(translations.getBelowGiveRegexRules());
		buttonChooseDestinationDirectory.setText(translations.getChooseDestinationDirectory());
		buttonSimulateChangeFileNames.setToolTipText(wrapHTML(translations.getSimulateFileChangesInfo()));
		buttonSimulateChangeFileNames.setText(translations.getSimulateChangeNames());
		buttonChangeFileNames.setToolTipText(wrapHTML(translations.getChangeFileNamesInfo()));
		buttonChangeFileNames.setText(translations.getChangeNames());
		buttonCopyToClipboard.setToolTipText(wrapHTML(translations.getCopyToClipBoardInfo()));
		buttonCopyToClipboard.setText(translations.getCopyToClipboard());
		buttonResetToDefaults.setToolTipText(wrapHTML(translations.getResetToDefaultsInfo()));
		buttonResetToDefaults.setText(translations.getDeleteSettings());
		buttonExample.setText(translations.getShowExample());
		buttonExample.setToolTipText(translations.getButtonShowExSettings());
		checkboxSaveStateOn.setToolTipText(wrapHTML(translations.getSaveStateCheckBoxInfo()));
		checkboxSaveStateOn.setText(translations.getSaveStateOnExit());
		chooseLanguageLabel.setText(translations.getChooseLanguage());
		setDirectoryInfoLabel(translations.getSeeChoosedDirPath());
		checkboxRecursiveSearch.setText(translations.getRecursiveSearch());
		checkboxRecursiveSearch.setToolTipText(translations.getRecursiveSearchToolTip());
		checkboxShowFullPath.setToolTipText(translations.getShowFullPathCheckboxTooltip());
		checkboxShowFullPath.setText(translations.getShowFullPathCheckbox());
		buttonClear.setText(translations.getButtonClear());
		buttonClear.setToolTipText(translations.getButtonClearTooltip());
	}
	
	private void setDirectoryInfoLabel(String info){
		choosedDirectoryLabel.setText(wrapHTML(bold(info)));
	}

	private void selectLanguage(AvailableLanguages lang){
		if(lang == null){
			lang = AvailableLanguages.English;
		}
		this.translations = new FileOperationsTranslations(lang);
	}
	  
	private Font getFontObject(){
		return new Font("Arial", Font.PLAIN, 11);
	}

	/**
	 * Method is checking if checkbox "Save state on exit" is checked
	 */
	@Override
	protected boolean isSaveObjectToDiskOnCloseTurnedOn(){
		return checkboxSaveStateOn.isSelected();
	}
	
	private boolean isRecursiveSearch(){
		return checkboxRecursiveSearch.isSelected();
	}
	private boolean isShowFullPath(){
		return checkboxShowFullPath.isSelected();
	}
	
	private String getChangedFilesAsHTMLTable(Map<String,String> map){
		return makeHTMLTableFromHashmap(map, tableAttributes, translations.getNameBeforeChange(), translations.getNameAfterChange());
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
		String newMsg =  msg.replace("</body>", message + "</body>");
		textArea.setText( newMsg );
	}
	
	private void showTextAreaHTMLInConsole(){
		debugInfo( "-------------------------\n" + textArea.getText() );
	}
	
	/**
	 * Gets textArea contents in HTML format
	 * @return
	 */
	private String getMessage(){
			return textArea.getText();
	}
	/**
	 * Gets textArea contents in plain text format
	 * @return
	 * @throws BadLocationException 
	 */
	private String getMessagePlainText() throws BadLocationException{
		return textArea.getDocument().getText(0, textArea.getDocument().getLength());
}
	
	private static String getTestDir(){
		return sampleDirectory;
	}
	
	/**
	 * Setting up example values if user clicks on Example button
	 */
	private void setupInitialValues(){
		String testDir = getTestDir();
		setDirectoryInfoLabel(testDir);
		lastChoosedDirectory = new File(testDir);
		regexFrom.setText(sampleRegexFrom);
		regexTo.setText(sampleRegexTo);
	}

	/**
	 * Resetting fields if user clicks on Reset button
	 */
	private void resetFields(){
		setDirectoryInfoLabel("");
		regexFrom.setText("");
		regexTo.setText("");
		textArea.setText("");
		lastChoosedDirectory = null;
		checkboxSaveStateOn.setEnabled(false);
		setMessage(translations.getFieldsHasBeenReset());
	}
	
	
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
///////////////////////////// BUTTON ACTIONS ///////////////////////////////////////////
	
	private void attachListeners(){
		//Add window listener
		this.removeWindowListener(this);
		this.addWindowListener(this); 

		buttonCopyToClipboard.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				try {
					OS.copyStringToClipboard( getMessagePlainText() );
				} catch (BadLocationException e) {
					showErrorMessage(e.getMessage());
					return;
				}
				setMessage( translations.getMessageHasBeenCopied() );
			}
		});
		
		buttonChooseDestinationDirectory.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				chooseDirectoryAction();
			}
		});
		
		buttonChangeFileNames.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setMessage( translations.getFileNamesChanged() );
				changeFileNamesAction(false);//false => real file change
			}
		});
		
		buttonSimulateChangeFileNames.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setMessage( translations.getSimulateChangeNames() );
				changeFileNamesAction(true);//true => only simulation of change with log
				if(debuggingModeOn){
					showTextAreaHTMLInConsole();
					debugInfo(textArea.getDocument().getDefaultRootElement().getName());
					debugInfo("Preferred dimensions of getPreferredSize: " + textArea.getPreferredSize());
					debugInfo("Preferred dimensions of getPreferredScrollableViewportSize: " + textArea.getPreferredScrollableViewportSize());
				}
			}
		});
		
		
		buttonExample.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setupInitialValues();
				//if it's not debugging mode
				if(!debuggingModeOn){
					showPlainMessage(translations.getExampleSettingsPopup());
				}
			}
		});
		
		
		buttonClear.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				textArea.setText(textAreaInitialHTML);
			}
		});
		
		buttonResetToDefaults.addActionListener(new ActionListener() {
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
			@SuppressWarnings("unchecked")
			public void actionPerformed(ActionEvent arg0) {
				JComboBox<String> obj = (JComboBox<String>) arg0.getSource();
				selectedLanguage = AvailableLanguages.getByName( (String)obj.getSelectedItem() ) ;
				selectLanguage(selectedLanguage);
				setComponentTexts();
			};
		});	
		
		//for debug 
		if(debuggingModeOn){
			buttonExample.doClick();
		}
		
		
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
		String from = regexFrom.getText();
		String to = regexTo.getText();
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
				File[] files = null;
				//recursive search
				if(isRecursiveSearch()){
					files = getFilesFromPathRecursive(absPath);
				} 
				//search only in first level
				else {
					files = getFilesFromPath(absPath);
				}
				if(files.length < 1){
					setMessage(translations.getHaveNotFoundFilesInDir());
					return;
				}
				///////////////////// RENAME FILES /////////////////////////////////////////////////////////////////////
				Map<String,String> renamedFiles = renameMachedFiles(files, fromPattern, toPattern, simulateOnly, isShowFullPath());
				String htmlString = getChangedFilesAsHTMLTable ( renamedFiles );
				
				if(htmlString.length() > 0){
					setMessage( (simulateOnly ? "" : translations.getFileNamesChanged() + BR) + htmlString.toString() );
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
	
	
}

/**
 * Following class is from: http://stackoverflow.com/questions/17533451/jeditorpane-linewrap-in-java7
 * And it's used to fix Java7 JEditorPane issue with line wrapping which doesn't correctly work with longer strings without spaces 
 * @author Dominik
 *
 */
@SuppressWarnings("serial")
class CustomEditorKit extends HTMLEditorKit {
	@Override
	public ViewFactory getViewFactory() {
	
	    return new HTMLFactory() {
	        @Override
	        public View create(Element e) {
	            View v = super.create(e);
	            if (v instanceof InlineView) {
	                return new InlineView(e) {
	                    @Override
	                    public int getBreakWeight(int axis, float pos, float len) {
	                        return GoodBreakWeight;
	                    }
	
	                    @Override
	                    public View breakView(int axis, int p0, float pos, float len) {
	                        if (axis == View.X_AXIS) {
	                            this.checkPainter();
	                            this.removeUpdate(null, null, null);
	                        }
	                        return super.breakView(axis, p0, pos, len);
	                    }
	                };
	            }
	            else if (v instanceof ParagraphView) {
	                return new ParagraphView(e) {
	                    @Override
	                    protected SizeRequirements calculateMinorAxisRequirements(int axis, SizeRequirements r) {
	                        if (r == null) {
	                            r = new SizeRequirements();
	                        }
	                        float pref = this.layoutPool.getPreferredSpan(axis);
	                        float min = this.layoutPool.getMinimumSpan(axis);
	                        // Don't include insets, Box.getXXXSpan will include them. 
	                        r.minimum = (int) min;
	                        r.preferred = Math.max(r.minimum, (int) pref);
	                        r.maximum = Integer.MAX_VALUE;
	                        r.alignment = 0.5f;
	                        return r;
	                    }
	
	                };
	            }
	            return v;
	        }
	    };
	    }
}






