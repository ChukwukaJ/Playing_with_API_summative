Playing_with_API_summative
Google Translate API Implementation for Multilingual Landing Page

To improve accessibility and enhance the user experience for a diverse audience, the Google Translate API was integrated into the landing page. This allows users to view the website’s content in their preferred language, making the page more inclusive and easier to use for non-English speakers.

Objective

The main objective of this integration is to enable users who do not speak English to access the content of the page in a language they understand. This supports inclusivity and ensures the landing page is usable by a wider, global audience.

Implementation Process
1. Adding the Google Translate API Script

The Google Translate API script was included in the <head> section of the HTML document to load the translation functionality:

<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

2. Setting Up the Translation Element

A <div> element with the ID google_translate_element was added where the translation widget would be displayed. Inline CSS was applied to position it at the top-center of the page:

<div id="google_translate_element"
     style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 1000;">
</div>


This styling ensures the widget is easily visible and positioned above other elements on the page.

3. Initializing the Google Translate Widget

A JavaScript function was created to initialize the Google Translate element once the page loads:

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}


Setting pageLanguage: 'en' indicates that the original content of the page is written in English. The widget then allows users to select their preferred translation language.

User Interaction

The Google Translate widget provides a dropdown menu containing multiple languages. Once a user selects a language, the page content is automatically translated. This makes the site more accessible for users who do not speak English and enables broader usability.

Results and Benefits
Accessibility

Users who speak other languages can interact with the content more easily.

Global Reach

The translation feature makes the site more inclusive and suitable for visitors from different parts of the world.

Ease of Use

The translation widget is positioned clearly and can be accessed without interfering with the rest of the page.

The integration of the Google Translate API supports the goal of creating a more inclusive and user-friendly environment.

Links

Live page:
https://chukwukaj.github.io/Playing_with_API_summative/

Demo video:
https://drive.google.com/file/d/1JksM91RHvO0SOVE6HQw2XHnqkhibD6yJ/view?usp=drive_link
