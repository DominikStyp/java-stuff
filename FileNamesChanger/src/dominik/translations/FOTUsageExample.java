package dominik.translations;

import dominik.translations.FileOperationsTranslations.AvailableLanguages;

/**
 * File Operations Translations usage example
 * @author Dominik
 *
 */
public class FOTUsageExample {

	private FileOperationsTranslations translations;
	
	private void selectLanguage(AvailableLanguages lang){
		if(lang == null){
			lang = AvailableLanguages.English;
		}
		this.translations = new FileOperationsTranslations(lang);
	}
	
	public static void main(String[] args){
		FOTUsageExample obj = new FOTUsageExample();
		obj.selectLanguage(AvailableLanguages.Polski);
		System.out.println("This will print YES in choosed language: " + obj.translations.getYes() );
	}
}
