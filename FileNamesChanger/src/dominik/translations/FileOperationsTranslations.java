/**
 * If you want to use this script (or more than 20% of the code) please do not remove this comment.
 * @author: DominikStyp@github.com
 * @url: https://github.com/DominikStyp
 */

package dominik.translations;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Locale;
import java.util.ResourceBundle;

public class FileOperationsTranslations implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3453506189601380391L;
	private static String bundleName = "dominik.translations.LabelsBundle";
	// ResourceBundle isn't serializable so we have to put transient here
	private transient ResourceBundle bundleObject = ResourceBundle.getBundle(
			bundleName, Locale.ENGLISH);

	/**
	 * Only here we define languages
	 * 
	 * @author Dominik
	 *
	 */
	public static enum AvailableLanguages {
		/**
		 * Adding new languages is child's play, just add another constructor like French("fr") and file bundle called LabelsBundle_fr.properties
		 */
		English("en"), Polski("pl");
		private String abbr;

		private AvailableLanguages(String abbr) {
			this.abbr = abbr;
		}

		public String getAbbreviation() {
			return this.abbr;
		}

		public static String[] getLanguagesArray() {
			ArrayList<String> langs = new ArrayList<String>();
			for (AvailableLanguages el : AvailableLanguages.values()) {
				langs.add(el.name());
			}
			String[] ret = langs.toArray(new String[langs.size()]);
			return ret;
		}

		public static AvailableLanguages getByName(String str) {
			for (AvailableLanguages el : AvailableLanguages.values()) {
				if (el.name().equals(str)) {
					return el;
				}
			}
			throw new IllegalArgumentException("There is no language named: "
					+ str + " available");
		}
	}

	public FileOperationsTranslations(AvailableLanguages aLanguage) {
		this.selectLanguage(aLanguage);
	}

	/**
	 * The user's first action is to select a language.
	 */
	public void selectLanguage(AvailableLanguages aLanguage) {
		if (aLanguage instanceof AvailableLanguages) {
			bundleObject = ResourceBundle.getBundle(bundleName, new Locale(
					aLanguage.getAbbreviation()));
		} else {
			throw new IllegalStateException("Unknown language");
		}
	}

	// ///////////// PUBLIC get certain translations ////////////

	public String getChangeNames() {
		return this.getKey("ChangeNames");
	}

	public String getGiveRegexFrom() {
		return this.getKey("GiveRegexFrom");
	}

	public String getBelowGiveRegexRules() {
		return this.getKey("BelowGiveRegexRules");
	}

	public String getCopyToClipboard() {
		return this.getKey("CopyToClipboard");
	}

	public String getGiveRegexTo() {
		return this.getKey("GiveRegexTo");
	}

	public String getSimulateChangeNames() {
		return this.getKey("SimulateChangeNames");
	}

	public String getChooseDestinationDirectory() {
		return this.getKey("ChooseDestinationDirectory");
	}

	public String getDeleteSettings() {
		return this.getKey("DeleteSettings");
	}

	public String getCopiedToClipboard() {
		return this.getKey("CopiedToClipboard");
	}

	public String getDirChosen() {
		return this.getKey("DirChosen");
	}

	public String getFileNamesChanged() {
		return this.getKey("FileNamesChanged");
	}

	public String getFileNamesSimulated() {
		return this.getKey("FileNamesSimulated");
	}

	public String getPreviousSettingsRemovedFromFile() {
		return this.getKey("PreviousSettingsRemovedFromFile");
	}

	public String getPreviousSettingsRemoved() {
		return this.getKey("PreviousSettingsRemoved");
	}

	public String getFileHasNotBeenRemoved() {
		return this.getKey("FileHasNotBeenRemoved");
	}

	public String getPreviousSettingsHasNotBeenRemoved() {
		return this.getKey("PreviousSettingsHasNotBeenRemoved");
	}

	public String getChooseDirectory() {
		return this.getKey("ChooseDirectory");
	}

	public String getDirHasNotBeenChosen() {
		return this.getKey("DirHasNotBeenChosen");
	}

	public String getFirstChooseDir() {
		return this.getKey("FirstChooseDir");
	}

	public String getRegexFieldFromNotFilled() {
		return this.getKey("RegexFieldFromNotFilled");
	}

	public String getRegexFieldToNotFilled() {
		return this.getKey("RegexFieldToNotFilled");
	}

	public String getHaveNotFoundFilesInDir() {
		return this.getKey("HaveNotFoundFilesInDir");
	}

	public String getChangedFileNames() {
		return this.getKey("ChangedFileNames");
	}

	public String getHaventFoudFilesMachedPattern() {
		return this.getKey("HaventFoudFilesMachedPattern");
	}

	public String getFolderIsntDirectory() {
		return this.getKey("FolderIsntDirectory");
	}

	public String getChooseLanguage() {
		return this.getKey("ChooseLanguage");
	}

	public String getSaveStateCheckBoxInfo() {
		return this.getKey("SaveStateCheckBoxInfo");
	}

	public String getResetToDefaultsInfo() {
		return this.getKey("ResetToDefaultsInfo");
	}

	public String getCopyToClipBoardInfo() {
		return this.getKey("CopyToClipBoardInfo");
	}

	public String getChangeFileNamesInfo() {
		return this.getKey("ChangeFileNamesInfo");
	}

	public String getSimulateFileChangesInfo() {
		return this.getKey("SimulateFileChangesInfo");
	}

	public String getRegexFromInfo() {
		return this.getKey("RegexFromInfo");
	}

	public String getRegexToInfo() {
		return this.getKey("RegexToInfo");
	}

	public String getFieldsHasBeenReset() {
		return this.getKey("FieldsHasBeenReset");
	}

	public String getSaveStateOnExit() {
		return this.getKey("SaveStateOnExit");
	}

	public String getMessageHasBeenCopied() {
		return this.getKey("MessageHasBeenCopied");
	}

	public String getRegexWrongPattern() {
		return this.getKey("RegexWrongPattern");
	}

	public String getRegexFileChanger() {
		return this.getKey("RegexFileChanger");
	}

	public String getShowExample() {
		return this.getKey("ShowExample");
	}

	public String getButtonShowExSettings() {
		return this.getKey("ButtonShowExSettings");
	}

	public String getSeeChoosedDirPath() {
		return this.getKey("SeeChoosedDirPath");
	}

	public String getExampleSettingsPopup() {
		return this.getKey("ExampleSettingsPopup");
	}

	public String getError() {
		return this.getKey("Error");
	}

	public String getWarning() {
		return this.getKey("Warning");
	}

	public String getInfo() {
		return this.getKey("Info");
	}

	public String getRecursiveSearch() {
		return this.getKey("RecursiveSearch");
	}

	public String getRecursiveSearchToolTip() {
		return this.getKey("RecursiveSearchToolTip");
	}

	public String getNameBeforeChange() {
		return this.getKey("NameBeforeChange");
	}

	public String getNameAfterChange() {
		return this.getKey("NameAfterChange");
	}

	public String getShowFullPathCheckbox() {
		return this.getKey("ShowFullPathCheckbox");
	}

	public String getShowFullPathCheckboxTooltip() {
		return this.getKey("ShowFullPathCheckboxTooltip");
	}

	public String getButtonClear() {
		return this.getKey("ButtonClear");
	}

	public String getButtonClearTooltip() {
		return this.getKey("ButtonClearTooltip");
	}
	
	public String getSimulationMessage() {
		return this.getKey("SimulationMessage");
	}
	
	public String getSureToChangeFileNamesQuestion() {
		return this.getKey("SureToChangeFileNamesQuestion");
	}
	public String getYes() {
		return this.getKey("Yes");
	}
	public String getNo() {
		return this.getKey("No");
	}
	

	// ///////////// PRIVATE ////////////////////////////////////////

	private String getKey(String key) {
		return bundleObject.getString(key);
	}

}
