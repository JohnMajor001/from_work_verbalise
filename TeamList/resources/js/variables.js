// NAME: VERBALISE?!!!!
/* Things to do
                Add More Categories + Themes (DISNEY THEME?!)
                Rules - add images
                Consider what may be necessary for 321 animation for all users
                Trim input fields for security
                Design drinking rules to implement
                Pass Button alert: comes immediately underneath button, fades out after 5 seconds?
                Edit Mistakes Page
                Aesthetics - create front-page humorous animation,
                              Favicon/LOGO,
                              Make Team Name Box bigger,
                              Final screen css
                Settings Page - Reset Button, standard settings - create a drag and drop?
                Give break down of game at final screen
                Animation to show teams moving forward?
                Back to homepage - This will
                                          1. Show home page with team Names already entered in as per previous game
                                          2. Reset:
                                                  timer back to what team selected
                                                  noOfTeams
                                                  noOfPlayers
                                                  teamNamesArray
                                                  playerNamesArray
                                                  teamObjectsArray
                                                  whichTeamPlays
                                                  categories
                                                  backUpCategories
                */

                /* Create a drag and drop element
                      1. <img draggable="true">

                      */

                      /* To Test
                                Ending page return Home button
                                Pass button alert*/
var drinkRules = false;
var noOfTeams = 0;
var noOfPlayers = 0;
var addItemBtn = document.getElementById('addItemBtn');
var list = document.getElementById('list');
var readyBtn = document.getElementById('readyBtn');
var rulesBtn = document.getElementById('rules');
var teamNamesArray = [];
var playerNamesArray = [];
var teamObjectsArray = [];
var wordsSuccessfullyDescribed = [];
var toWin = 10;
var noMorePassesText = 'All Passes used!';
var maximumPasses = 3; // Only Useful really when settings page is created
var timesUpMessage = "Time's up!";
var whichTeamPlays = 0;
var timer = 5;
var categories = [];

// Rules Content
var nextArrow = document.getElementById('nextArrow');
var rulesContent = document.getElementById('rulesContent');
var rulesNo1 = `<h1>Overview</h1>
                <p>This is a turn-based game with a minimum of two teams.
                The aim of the game is to get to the finish line first!</p><br />
                <p>You move forward by describing/correctly guessing the word on the screen,
                depending on your role at the time.</p>`;
var rulesNo2 = `<h1>Each Round</h1>
                <p>Only one team moves during each round.</p><br />
                <p>A player will be designated the \'describer\' and will race against the clock to
                 describe the word on the screen to their team mate(s).
                If the team successfully guesses the word, you can click 'Got it!' and hurry to get the next word!
                </p><br />
                <p>The more words you successfully describe/guess within the alloted time the
                higher your team's score and the faster you will reach the finish line!</p><br />`;
var rulesNo3 = `<h1>The Don'ts</h1>
                <p>The describer may <strong style='text-decoration: underline;'>NOT</strong></p><br />
                <ul class='rulesList'>
                  <li>Say any direct part of the word itself</li>
                    <ul class='rulesList'>
                      <li>E.g. you may not describe the word 'fishhook' as 'a tool for hooking fish'</li>
                    </ul>
                  <li>Use 'Sounds like', 'Rhymes with' or 'Ends/Starts with'</li>
                  <li>Use any props or tools</li>
                </ul>`;
var rulesNo4 = `<h1>The Do's</h1>
                  <p>You <strong style='text-decoration: underline;'>MAY</strong></p><br />
                <ul class='rulesList'>
                <li>Be as articulate as possible</li>
                <li>Gesture and point</li>
                <li>Sing/hum</li>
                </ul><br />
                <p>Have fun!</p>`;

// Niche Categories
var internets = {
    name: 'Internet Culture',
    array: ['Memes', 'White-guilt', 'Black Lives Matter', 'All Lives Matter', 'Hashtag', 'Twitter', 'Facebook', 'Bebo', 'MySpace',
            'DailyMash', 'Liberal Tears', 'Podcast', 'Pepe the Frog', 'GarageBand', 'Le', 'Over 9000', 'One Punch', 'Shrek is Love', 'Laughing out Loud',
            'At the moment', 'Shaking my head', 'To be fair', 'What the Fuck?', 'Trolling', 'Shitposting', 'Social Justice Warrior',
            'Pewdiepie', 'Baader-Meinhof Phenomenon', 'Vaccination', '#MeToo', '#NoMakeUpSelfie', 'Selfies', 'Photoshop', 'Be Like Bill',
            'Triggered', 'FemiNazi', 'I don\'t like sand', 'Comic Sans', 'Lorom Ipsum', 'Grumpy Cat', 'Kylo-Ren\'s Tri-lightsaber', 'Solo shot first',
            'Expendable Henchman', 'PhilosoRaptor', 'RickRolling', 'Chain-messages', 'Nigerian Prince Emails', '9/11', 'Bush inside Job', 'MarySue',
            'White Knight', 'BetaMale', 'Irony', 'More Cowbell', 'Wazaaaaa', 'Fuck the Mayweathers', 'Shrek is Life', 'It\'s not Ogre till it\'s Ogre',
            'U mad Bro?', 'U even lift Bro?', 'Doge', 'Leekspin', 'Spitroasting', 'Tony Danza', 'All your base are belong to us', 'Laser Sword',
            'Good Guy Greg', 'Spinning Ballerina illusion', 'Overly Attached Girlfriend', 'Gangnam Style', 'Peel the Avocado', 'Avocado Toast',
            'NoFap', 'Pornography', 'Procrastination', 'Surfing', 'LOLcats', 'Keyboard Warrior', 'Ermahgerd', 'Double Rainbow', 'Masterbation',
            'Epic Fail', 'NONONO cat', 'Pikachu use thundersmash', 'Fuck Stacey', 'Numa Numa Dance', 'Humans of New York', 'Humans of the Sesh',
            'LadBible', 'Lizzy the Lezzy', 'Achmed the Dead Terrorist', '#JeSuisCharlie', '#IbelieveHer', 'Trending', 'Chuck Norris', 'Charlie bit me!',
            'Ask a Ninja', 'Nope, Chuck Testa!', 'Will it blend?', 'Engrish Funny', 'The TreadMill Dance', 'Nuts the Squirrel', 'One Red Paperclip',
            'FlatEarth', 'Australia not real', 'Jizz In My Pants', 'Demotivational Posters', 'The Hamsterdance', 'Dramatic Chipmunk', 'Coke and Mentos',
            'Elf On the Shelf', 'legit', 'The Wealdstone Raider', 'Got no fans', 'Damn Daniel', 'IceBucket Challenge', 'The Coloured Dress',
            'Cultural Appropriation', 'Offended', 'Crazy Frog', 'Chum Drum Bedrum', 'The Floss', 'Man\'s Not Hot', 'No Ketchup, just sauce',
            'Roasting', 'Swipe Left', 'Slender Man', 'Troll Face', 'Drinking the Kool-Aid', 'Forever Alone', 'Lenny Face', 'Zerg Rush', 'TwitchChat Cancer',
            'Smell yo Dick', 'Buzzfeed', 'Dolan', 'Liopleurodon', 'Ugandan Knuckles', 'Petty Ghost', 'Tag Someone who', 'Charlie The Unicorn',
            'Salad Fingers', 'Y U NO guy', 'Scumbag Steve', 'Arrow in the Knee', 'You Don\'t Say?', 'Wow', 'The Mandela Effect', 'Rules of the Internet',
            'Rock Bottom', 'Ridiculously Photogenic Guy', 'Ancient Aliens', 'Obama Rage Face', 'Derp', 'Dank', 'Bad Luck Brian', 'Rule no.34',
            'Rage Comics', 'Do a Barrel Roll', 'Me Gusta', 'Flipping Tables', 'Neil deGrasse Tyson Reaction', 'Fake News', 'Perry the Platypus',
            'Steamed Hams', 'Nazi Pug', '#FreeTheNipple', 'Cray Cray', 'Trapped In The Closet', 'Nyan Cat', 'Baby Monkey Riding On a Pig',
            'The Ultimate Showdown', 'How Rude', 'Here\'s Johnny', 'Lemon Stealing Whores', 'Haters Gonna Hate', 'Annoying FaceBook Girl',
            'Hold my beer', 'Challenge Accepted', 'wat', 'Harambe', 'The Most Interesting Man in the World', 'Dick Butt', '60\'s Spider-Man',
            'Herp', 'PedoBear', 'Dat Ass', 'Kappa', 'Harlem Shake', 'Cash Me Outside', 'Viral', 'First World Problems', 'Ma Mixtape', 'Emojis',
            'Msn', 'Socially Awkward Penguin', 'Awkward Balloon', 'Awky Momo', 'Totes McGoats', 'One does not simply...', 'True Story',
            'Cool Story Bro', 'Futurama Fry', 'Fap', 'Facepalm', 'Thug Life', 'Deal With It', 'CreepyPasta', 'Bye Felicia', 'Fuck her right in the Pussy',
            'Darude - Sandstorm', 'All the things', 'Cereal Guy', 'Senpai', 'Bear Grylls', 'Raise Your Dongers', 'Sweet Brown', 'Would not bang', 'Tinder',
            'Kek', 'Fam', 'Success Kid', 'U WOT M8', 'Cinnamon Challenge', 'Impossibru', 'STAHP PLS', 'Dafuq', 'Hide the pain Harold', 'Feels bad man',
            'The Fappening', 'That\'s Racist!', 'The Cake is a lie', 'Come at me Bro', 'Son I am Disappoint', 'Swag', 'Duck face', 'Escalated Quickly',
            'Jet Fuel', 'Steel Beams', 'Tower 7', 'Work-safe Porn', 'Poker Face', 'Tubgirl', 'Two girls one cup', 'Tree Fiddy', 'My Body is Ready',
            'Ha, Gay!', 'Conspiracy Keanu', 'Indestructable Nokia 3310', 'Mom\'s Spaghetti', 'Feels', '\'Murica', '420 Blaze It', 'It\'s a Trap!',
            'Like A Boss', 'What Are Those?', 'College Liberal', 'Surpise Muthafucka', 'Huehuehue', 'Scumbag Stacy', 'Condescending Wonka', 'Meatspin',
            'Confused Black Girl', 'Lazy College Senior', 'Rito pls', 'Leeroy Jenkins', 'Advice Dog', 'Hitler Reacts', 'Jerk Jesus', 'Hugh Mungus',
            'Hide Yo Kids', 'Hentai Woody', 'Nicolas Cage', 'Unhelpful Teacher', 'Skull Trumpet', 'In Soviet Russia...', 'Too long, didn\'t read',
            'Puking Rainbows', 'Thicc', 'Brace Yourselves', 'Confused Nick Young', 'Deez Nuts', 'Got \'Em', 'Do it Live', 'Not even my final form',
            'Trigglypuff', 'Sudden Clarity Clarence', 'Big Smoke\'s Order', 'Salt Bae', 'The Dab', 'Kill yourself', 'Go home, you\'re drunk',
            'You\'re doing it wrong', 'Hipster Ariel', 'On Fleek', 'Kanye Interrupts', 'Nom nom nom', '#rekt', 'Skrillex', 'Expanding Brain',
            'Confused Travolta', 'Zuckerberg Note Pass', 'Tits or GTFO', 'Spoderman', 'Butthurt', 'Release the Kraken', 'Why is the Rum always gone?',
            'Science, bitch', 'THE GAME', 'Arthur\'s Fist', 'Activated Trap Card', 'Blue Waffle', 'Diabeetus', 'Chemistry Cat', 'My Name is Jeff',
            'Full Retard', 'Did you die?', 'Woll Smoth', 'Error 404', 'Wonderwall', 'That\'s what she said', 'Just do it', 'Ebola', 'Change my Mind',
            'H3h3', 'Ben Shapiro', 'Jordan Peterson', 'ShoeOnHead', 'Kill it with fire', 'Derpina', 'Confession Bear', 'Tunak Tunak Tun', 'Ainsley Harriot',
            'Grammar Nazi', 'Face Swap', 'SnapChat', 'See me Rollin\'', 'Women Logic', 'ROFLcoptor', 'reddit', 'World of Warcraft', 'Nailed it',
            'Anonymous', 'Pineapple Pen', 'Covfefe', 'The Room', 'Attractive Convict', 'Everyday I\'m Shufflin\'', 'Friend Zoning', 'Peanut Butter Jelly Time',
            'White people dancing', 'Crash Bandicoot Woah', 'You Tried', 'I regret Nothing', 'Griefing', 'Flaming', 'Feeding', 'Luigi\'s Death Stare',
            'Streisand Effect', 'Pakalu Papito', 'Salty', 'YOLO', 'Spoiler alert', 'Streaming', 'Corporations', 'Rabbit hole', 'Milf', 'Cuck',
            'Whatsapp', 'Blogging', 'E-mail', 'Social Media', 'Glitch', 'Millenials', 'Generation Z', 'Chillaxin\'', 'Google', 'Apple', 'Website',
            'Bluetooth', 'Bosh', 'Veganism', 'Dat Ash', 'Overly Manly Man', 'Carl!', 'Bae', 'Russian Sleep Experiment', 'Cheeky Nandos',
            'Netflix and Chill', 'Actual advice Mallard', 'Rip in peace', 'Pacha Edits', 'Furries', '[intensifies]', 'Pun Dog', 'You are a Pirate',
            'Raptor Jesus', 'Planking', 'Owling', 'Twerking', 'dis gon b gud', 'Unpopular opinion Puffin', 'Bitch please', 'Download', 'Zip file',
            'Piratebay', 'Trial Account', 'Random', 'Actual footage of', 'Joe Rogan', 'Archbishop of Banterbury', 'Esteemed Character Actress Margo Martindale',
            'Yahoo', 'imgur'],
};

// Standard Categories
var miscellaneous = {
      name: 'Miscellaneous',
      array: ['Existentialism', 'Nihilism', 'Upside Down', 'New Age', 'Utilitarianism', 'Foundationalism', 'Mormonism',
              'Scientology', 'Judaism', 'The Holocaust', 'Christianity', 'Buddhism', 'Hinduism', 'Philosophy', 'Satanism',
              'Church of England', 'Catholicism', 'Presbyterian', 'Protestantism', 'Eastern Orthodox Church', 'Creationism',
              'Anglicanism', 'Something\'s fishy', 'Science', 'Actually', 'Lovingly', 'Pro-life', 'Pro-choice', 'Crisis', 'Coupon',
              'Voucher', 'Discount', 'Disappointment', 'Fundamentalist', 'Right-wing', 'Marxism', 'Confucionism', 'Leprechaun', 'Pot of Gold',
              'Rainbow', 'Physics', 'Biology', 'Chemistry', 'Geography', 'Trotters', 'Mane', 'Centre', 'Religion', 'Music', 'History', 'Mathematics',
              'Language', 'Information Technology', 'Double-Dutch', 'Abrakadabra', 'The Alphabet', 'Antidisestablishmentarianism', 'Supercalifragilisticexpialidocious',
              'Carpe Diem', 'Claustrophobia', 'Arachnophobia', 'Vertigo', 'Déjà vu', 'Cynophobia', 'Extreme Sports', 'Utensil', 'Speed of Light', 'Lightyear',
              'Higgs Boson', 'Meteor', 'Comet', 'The Sun', 'The Moon', 'Avatar', 'Periodic Table of Elements', 'Seasons', 'Solar Eclipse', 'Summer', 'Spring',
              'Autumn', 'Winter', 'Gurdwara', 'Hijab', 'Burqa', 'Scrabble', 'Monopoly', 'Economies of Scale', 'Concept', 'Pedagogy', 'Simplistic',
              'Justice', 'Justification', 'Battle Royale', 'Lazarets', 'Journal', 'Diary entry', 'Quadroped', 'Cuboid', 'Triangle', 'Jaffa Cake', 'Souffle',
              'Feeling Blue', 'Roller Coaster Ride', 'Leviathan', 'Weight', 'Acceleration', 'Niche', 'Bespoke', 'Antique', 'Artificial', 'The Matrix',
              'Scandal', 'Blunder', 'Miscellaneous', 'Commonwealth', 'Olympics', 'Fame', 'Hollow-bodied', 'Vibration', 'Sound', 'Silence', 'Engagement Ring',
              'Scales', 'Fat', 'Protein', 'Gravitas', 'Gusto', 'Invitation', 'Party', 'Tradition', 'Race', 'Rendevouz', 'Raison d\'êtres', 'Public House',
              'Restaurant', 'Hotel', 'Motel', 'Brexit', 'Immigration', 'Interview', 'Curriculum Vitae', 'Menu', 'Pronunciation', 'Issue', 'Perfume',
              'Bourgeoisie', 'Aristocracy', 'Craft', 'Bold', 'Mechanism', 'Chiropractor', 'Podiatrist', 'Livid', 'Sentimentality', 'Monotony',
              'Melancholic', 'Alcohol', 'Etymology', 'Calligraphy', 'Graphology', 'Linguistics', 'Cosmos', 'Horoscope', 'Radiologist', 'DNA',
              'Spinster', 'Bachelor', 'Nun', 'Priest', 'Rabbhi', 'Pastor', 'Magic', 'Shapes', 'Square', 'Sphere', 'Compass', 'Ruler', 'Potractor',
              'Potometer', 'Senectitude', 'Baton', 'Riddle', 'Limerick', 'Concern', 'Wild', 'Class Clown', 'Software', 'Trademark', 'Anglophone',
              'Borrow', 'Content', 'Craziness', 'OK', 'Never', 'Mind-map', 'Haircut', 'Omnipresent', 'Kafkaesque,', 'Fiction', 'Oppression',
              'Fantastic', 'Punctuation', 'Interjection', 'Citizenship', 'Unemployment rate', 'Garage', 'Fired', 'Apprenticeship', 'Kidnap', 'Company',
             'Ribbed', 'Wrapping Paper', 'Christmas', 'Thanksgiving', 'Hanukkah', 'Chinese New Year', 'St. Patrick\'s Day', 'Millenium Bug',
             'Generation Gap', 'Brochure', 'Harmonics', 'Burger', 'Fish and Chips', 'Chilli Con Carne', 'Fast Food', 'Pimms', 'Uplifting',
             'El Día de los Muertos', 'Hallowe\'en', 'St. Steven\'s day', 'Lethargy', 'Apathy', 'Boredom', 'Pregnant', 'Crank', 'Emotional',
             'Superb', 'Skeleton', 'Fossil', 'Dinosaur', 'Inappropriate', 'Makeover', 'Musical', 'Ancestral', 'Thug', 'Space Invasion',
             'UFO', 'Bilingual', 'Smoothie', 'Ice cream', 'Hazard', 'Cone', 'Chewing gum', 'Footing', 'Fluency', 'Pebble', 'Nationality',
             'Trickster', 'Gangster', 'Menace', 'Youth', 'Access', 'University', 'Education', 'Post-modernism', 'Alternative', 'Brief',
             'Fancy', 'Posh', 'Rugby', 'American Football', 'Soccer', 'Tennis', 'Bowling', 'Bridge', 'Deck of Cards', 'Ski poles',
             'Palm-reading', 'Evolution', 'White Blood cell', 'Cytoplasm', 'Platelet', 'Poor', 'Plasma', 'Pleasantry', 'Superpower',
             'Ammunition', 'The Black Death', 'The Spanish Armada', 'The Fountain of Youth', 'Alleatoric', 'Leotard', 'Unnecessary',
             'Ignorance is bliss', 'Great Minds', 'Fools seldom differ', 'Good as Gold', 'Silver Fox', 'Clever Clogs', 'Puss in boots',
             'Redemption', 'Hubris', 'Genius', 'Elegance', 'Slippery Slope', 'Cheeky Charlie', 'Simple Simon', 'Silver lining', 'Tunnel vision',
             'Single-minded', 'Broken-hearted', 'U-turn', 'Liver', 'Centrist', 'Spiritual', 'Satirical', 'Figurative', 'Metaphor', 'Simile',
             'Stitch in time', 'Turn-off', 'Arrogant', 'Manipulate', 'Innocent', 'Matter-of-fact', 'Down-to-earth', 'Dual-carriageway', 'Quotation marks',
             'Brunch', 'Gob-stopper', 'Bamboozled', 'ASAP', 'Post Script', 'Over the Moon', 'Gold-plated', 'Honeymoon', 'Testimonial',
             'Disclaimer', 'Terms and Conditions', 'Privacy Policy', 'Log-in', 'Womanhood', 'Manhunt', 'Women\'s Institute', 'Department Store',
             'Waiver', 'Lost cause', 'Lost and found', 'Hopeless', 'Comprehensive', 'Story', 'Mindless', 'Thick as thieves', 'Daft', 'Fiery',
             'Darkness', 'Single-handed', 'Rough', 'Mouth-to-mouth', 'Nervous Breakdown', 'Midnight feast', 'Reality TV', 'Round the bend',
             'Square peg', 'Invisible', 'Speculator', 'Sweet Dreams', 'Rush Hour Traffic', 'High time', 'Crush', 'Blind date', 'Kind Regards',
             'Sand-castle', 'Road to nowhere', 'Spaced-out', 'Downtrodden', 'Impass', 'Devastation', 'Devotion', 'Moonshine', 'Cornerstone', 'telegram',
             'Beige', 'Purple'],


};
var world = {
	name: 'World',
	array: ['Village', 'Town', 'Cul de Sac', 'Globe', 'Scandinavia', 'Mars', 'Jupiter', 'Uranus', 'Neptune', 'Saturn', 'Mercury', 'Venus', 'Earth',
          'Pluto', 'Star', 'Europa', 'Pakistan', 'Kazakhstan', 'Uzbekistan', 'Afghanistan', 'Caucasus', 'Russia', 'Kyrgyzstan', 'Tajikstan',
					'Turkmenistan', 'Iran', 'India', 'Azerbaijan', 'Kurdistan', 'Egypt', 'Kenya', 'South Africa', 'Swaziland', 'Zimbabwe',
					'Chad', 'Madagascar', 'Sudan', 'Republic of the Congo', 'Democratic Republic of the Congo', 'Sierra Leone', 'Ghana', 'Botswana',
					'Ethiopia', 'Zambia', 'Uganda', 'Algeria', 'Angola', 'Rwanda', 'Cameroon', 'Somalia', 'Tanzania', 'Senegal', 'Libya',
					'Republic of Ireland', 'Northern Ireland', 'England', 'Wales', 'Scotland', 'Dublin', 'Belfast', 'Galway', 'Liverpool', 'London', 'Manchester',
					'Newcastle', 'Brighton', 'Stonehenge', 'The Giant\'s Causeway', 'Cardiff', 'Holyhead', 'Glasgow', 'Edinburgh',
					'Dundee', 'Downunder', 'Hastings', 'Cornwall', 'Lough Neagh', 'Buckingham Palace', 'Trafalgar Square',
					'Piccadilly Circus', 'King\'s Cross', 'France', 'Paris', 'Eiffel Tower', 'The Louvre', 'Arc de Triumph', 'Nice',
					'Timbuktu', 'Bordeaux', 'Versailles', '10 Downing Street', 'Westminster Abbey', 'Corsica', 'Normandy', 'Saint-Tropez',
					'Alsace-Lorraine', 'Grand Canyon', 'Mediterranean', 'Toulouse', 'The Alps', 'Yonder', 'Mont Blanc', 'Berlin',
					'Brandenburg Gate', 'Leipzig', 'Bavaria', 'Prussia', 'Lake Constance', 'The Great Wall of China', 'Great Pyramid of Giza',
					'Babylon', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Temple of Artemis', 'Olympus', 'Mausoleum at Halicarnassus',
					'Madrid', 'Palacio Real', 'Barcelona', 'Ibiza', 'Granada', 'El Camino', 'Casablanca', 'Alicante', 'Spain', 'Madeira',
					'Porto', 'Lisbon', 'Puerto Rico', 'San Miguel', 'Praia da Luz', 'Geneva', 'Zurich', 'The Rhine Falls', 'Austria',
					'Vienna', 'Salzburg', 'Benedictine Abbey', 'Hofburg', 'Schonbrunn', 'Colosseum', 'Leaning Tower of Pisa', 'Venice',
					'Pompeii', 'Lake Como', 'Amalfi Coast', 'Florence', 'Vatican City', 'St Mark\'s Basilica', 'Pantheon', 'Sistine Chapel',
					'Archipelago', 'Pacific', 'Atlantis', 'Atlantic', 'Baltic', 'Indian', 'Rome', 'Milan', 'Gulf of Naples', 'Milan', 'Genoa',
					'Assisi', 'Bologna', 'Turin', 'Mount Etna', 'Sizewell B', 'Meteora', 'Greece', 'Athens', 'Delphi', 'Corinth',
					'Ionian Islands', 'Sicily', 'Karkow', 'Warsaw', 'Auschwitz', 'Belarus', 'Minsk', 'Slutsk', 'Kosava', 'Vilnius',
          'Lithuania', 'Riga', 'Kaunas', 'Mount Everest', 'River Jordan', 'Israel', 'Czech Republic', 'Prague', 'Slovakia', 'Bratislava',
          'Hungary', 'Budapest', 'Romania', 'Bucharest', 'Serbia', 'Belgrada', 'Slovenia', 'Ljubljana', 'Croatia', 'Zagreb', 'Sarajevo',
          'Bosnia and Herzegovina', 'Montenegro', 'Podgorica', 'Albania', 'Tirana', 'Kosovo', 'Pristina', 'Bulgaria', 'Sofia', 'Black Sea',
          'Turkey', 'Istanbul', 'Sardinia', 'Crete', 'Tunisia', 'Tunis', 'Ukraine', 'Kiev', 'Estonia', 'Tallin', 'Denmark', 'Copenhagen',
          'Sweden', 'Stockholm', 'Belgium', 'Brussels', 'Bruges', 'Netherlands', 'Amsterdam', 'Republic of Masedonia', 'Skopje', 'Hamburg',
          'Cologne', 'Stuttgart', 'Principality of Liechtenstein', 'Vaduz', 'Norway', 'Oslo', 'Finland', 'Helsinki', 'Severny Island', 'The North Pole',
          'Iceland', 'Reykjavik', 'Faroe Islands', 'Isle of Man', 'Jersey', 'Guernsey', 'Isle of Wight', 'Malta', 'Algiers', 'Murcia', 'Gibraltar',
          'Morocco', 'Togo', 'Seashore'],
};

var objects = {
	name: 'Objects',
	array: ['Fork', 'Knife', 'Plate', 'Glass', 'Spyglass', 'Keyboard', 'Television Set', 'Mobile Phone',
				 'Torch', 'Flashlight', 'Sexton', 'Key Fob', 'Printer', 'Bathtub', 'Shower', 'Boiler Plate',
				 'Knob', 'Handle', 'Nail', 'Hammer', 'Wrench', 'Screwdriver', 'Remote Control', 'Button', 'Rubbish bag',
				 'Towel', 'Bath Robe', 'Bathing suit', 'Boxer Shorts', 'Underpants', 'Door', 'Skirting board', 'Wash basket',
				 'Knitwear', 'Jumper', 'Jar', 'Envelope', 'Bottle', 'Cheese Grater', 'Drawer', 'Tube', 'Box', 'Card',
				 'Bag', 'Handbag', 'Cowboy Boots', 'Leopard-print Trousers', 'Lamp Shade', 'Turntable', 'Flute', 'Javelin',
				 'Guitar Case', 'SuitCase', 'Saucepan', 'Pot', 'Mug', 'Lazy Susan', 'Shuttlecock', 'Tennis Ball', 'Shotput',
				 'Piano', 'Surfboard', 'Sponge', 'Tin Can', 'Magazine', 'Newspaper', 'Catalogue', 'Tissuebox', 'Wallet',
				 'Jewellery Box', 'Water Jug', 'Lanturn', 'Lightbulb', 'Switch', 'Pad', 'Blackboard', 'Floppy Disk', 'Refridgerator',
				 'Standing Mirror', 'Pouch', 'Cafeteria Tray', 'Book', 'fan', 'Mute', 'Key-ring', 'Soap Dispenser', 'Bubble Wrap',
				 'Shopping Trolley', 'Umbrella', 'Cane', 'Optical Lenses', 'Bicycle', 'Dial', 'Tape Recorder', 'Poncho', 'Ladder',
				 'Mp3 Player', 'Walkman', 'Thermos', 'Notepad', 'Door Mat', 'Nailbrush', 'Toothbrush', 'Broom', 'Wet Suit', 'Diving Board',
				 'Scissors', 'Tupperware Container', 'WhiteBoard', 'Golf Club', 'Golf Ball', 'Blade', 'Sword', 'Swiss Army Knife',
				 'Filter', 'Nozzle', 'Matchstick', 'Hair Dryer', 'Hose Pipe', 'Dildo', 'Fleshlight', 'Butterfly Knife', 'Microwave', 'Cupboard',
         'Spray bottle', 'Button', 'Chess Board', 'Oven', 'Rope', 'Candlestick', 'Toaster', 'Umbrella', 'Folder', 'Duvet', 'Sheet',
         'Laundry Basket', 'Socket', 'Plug', 'Glasses', 'Clip Board', 'Stapler', 'Pen', 'Pencil', 'Eraser', 'Rubber', 'Hammock',
         'Lilo', 'Armband', 'Bandage', 'Toilet Roll', 'Cast', 'Paperweight', 'Bookends', 'Hair Clip', 'Fishing Line', 'Buoy', 'Boat',
         'Car', 'Lorry', 'Truck', 'Van', 'Dvd', 'Rubik\'s Cube', 'Purse', 'Hairband', 'Plastic bag', 'Blinds', 'Curtains',
         'Rug', 'Dress', 'Skirt', 'Flip-flops', 'Sandals', 'Sneakers', 'Trainers', 'Shoes', 'High Heels', 'Yoga Pants', 'Yoga Mat',
         'Grandfather Clock', 'Yo-yo', 'Birdhouse', 'Doll House', 'Microphone', 'Steel Wool', 'Silencer', 'Revolver',
         'Shotgun', 'Led Pipe', 'Bagpipes', 'Vase', 'Bible', 'Qu\'ran', 'Cauldron', 'Lever Arch File', 'Bobble-head', 'Hair bobble',
         'Rubber band', 'Staff', 'Sleeve', 'Lipstick Container', 'Smoking Pipe', 'Cigarette', 'Bong', 'Didgeridoo', 'Pacifier',
         'Bib', 'Highchair', 'Dummy', 'Sleigh', 'Sledge hammer', 'Tyre', 'Tile', 'Kettle', 'Post-it Note', 'Telephone Box', 'Post Box',
         'Trench Coat', 'Backpack', 'Polaroid Camera', 'Vacuum Cleaner', 'Q-tip', 'Cotton-bud', 'Toilet Brush', 'Stethoscope', 'Syringe',
         'Sphygmomanometer', 'Drum', 'Iron', 'Headphones', 'Fretboard', 'Bow and Arrow', 'Teapot', 'Crockery', 'Oven Gloves', 'Engine', 'Grandmother Clock',
         'Rattle'],
			};
var actions = {
	name: 'Verbs',
	array: ['Juggling', 'Walking', 'Running', 'Sprinting', 'Debating', 'Killing', 'Murdering', 'Slaughtering', 'Destroying',
          'Swapping', 'Distracting', 'Playing', 'Disposing', 'Negotiating', 'Eating', 'Following', 'Jingling', 'Returning',
          'Standing', 'Sleeping', 'Branding', 'Meeting', 'Dreaming', 'Singing', 'Waking', 'Loving', 'Skipping', 'Rhyming',
          'Chasing', 'Shadowing', 'Stalking', 'Going', 'Leaving', 'Exiting', 'Mourning', 'Disappearing', 'Calling', 'Mining',
          'Reaching', 'Hopping', 'Waving', 'Circling', 'Driving', 'Laughing', 'Making', 'Hiding', 'Looking', 'Courting', 'Moulding',
          'Humming', 'Holding', 'Counting', 'Numbering', 'Dancing', 'Lying', 'Questioning', 'Reversing', 'Tailing', 'Whistling',
          'Theorising', 'Coding', 'Starting', 'Beginning', 'Ending', 'Trying', 'Recording', 'Pouring', 'Scattering', 'Vlogging',
          'Dodging', 'Ducking', 'Swimming', 'Winking', 'Kissing', 'Snogging', 'Shrugging', 'Waking', 'Reading', 'Writing', 'Listening',
          'Speaking', 'Interviewing', 'Selling', 'Buying', 'Exchanging', 'Bartering', 'Discounting', 'Bargaining', 'Sailing', 'Haggling',
          'Babbling', 'Conversing', 'Communicating', 'Draining', 'Training', 'Seeping', 'Washing', 'Laundering', 'Merging', 'Spelling',
          'Escaping', 'Rescuing', 'Hiding', 'Revealing', 'Wandering', 'Wondering', 'Describing', 'Articulating', 'Learning', 'Teaching',
          'Assessing', 'Correcting', 'Marking', 'Diminishing', 'Belittling', 'Instructing', 'Bribing', 'Suing', 'Claiming', 'Crying', 'Exploring',
          'Exploding', 'Loading', 'Gaming', 'Moaning', 'Working', 'Relaxing', 'Refreshing', 'Reenergising', 'Self-destructing', 'Monetising',
          'Schooling', 'Transferring', 'Telling', 'Dying', 'Living', 'Dyeing', 'Drying', 'Diving', 'Boxing', 'Improving', 'Riding', 'Cycling',
          'Hitching', 'Skating', 'Flying', 'Soaring', 'Gliding', 'Boating', 'Cruising', 'Seeing', 'Believing', 'Touching', 'Humouring', 'Sensing',
          'Hearing', 'Smelling', 'Spying', 'Frying', 'Roasting', 'Bludgeoning', 'Bleeding', 'Swerving', 'Begrudging', 'Becoming', 'Tying', 'Smiling',
          'Reflecting', 'Doing', 'Sewing', 'Knitting', 'Crocheting', 'Corroding', 'Dissolving', 'Erroding', 'Melting', 'Sieving', 'Baking', 'Cooking',
          'Bathing', 'Showering', 'Showing', 'Drinking', 'Consuming', 'Imbibing', 'Partaking', 'Soliciting', 'Reserving', 'Booking', 'Conserving', 'Responding',
          'Advocating', 'Retorting', 'Putting', 'Golfing', 'Fishing', 'Farming', 'Anchoring', 'Serving', 'Checking', 'Telephoning', 'Watching', 'Whispering',
          'Misleading', 'Leading', 'Travelling', 'Transporting', 'Translating', 'Troubling', 'Riddling', 'Fiddling', 'Fidgeting', 'Groping', 'Fondling',
          'Fornicating', 'Massaging', 'Eyeing', 'Being', 'Using', 'Dragging', 'Scribing', 'Introducing', 'Concluding', 'Creating', 'Debunking', 'Defibrilating',
          'Testing', 'Admonishing', 'Organising', 'Trespassing', 'Relating', 'Resting', 'Napping', 'Reporting', 'Experimenting', 'Sustaining', 'Surprising',
          'Narrating', 'Parking', 'Panting', 'Stroking', 'Reasoning', 'Typing', 'Tugging', 'Tilling', 'Totting', 'Toddling', 'Tooting', 'Tipping', 'Taking',
          'Trekking', 'Turning', 'Tracing', 'Analising', 'Criticising', 'Dispelling', 'Corrupting', 'Characterising', 'Falling', 'Factoring', 'Accounting',
          'Lecturing', 'Liasing', 'Betraying', 'Prophesying', 'Converting', 'Demonising', 'Demonstrating', 'Disentangling', 'Crossing', 'Lining', 'Pouncing',
          'Fingering', 'Pinning', 'Prying', 'Kneading', 'Knowing', 'Exclaiming', 'Helping', 'Heeding', 'Recruiting', 'Battling', 'Outsourcing', 'Crystalising',
          'Building', 'Celebrating', 'Regulating', 'Struggling', 'Navigating', 'Disclosing', 'Freeing', 'Missing', 'Microwaving', 'Shutting', 'Lifting', 'Leaning',
          'Lording', 'Hoarding', 'Lurching', 'Shouting', 'Screaming', 'Swinging', 'Flailing', 'Failing', 'Decaying', 'Deliberating', 'Deeming', 'Judging',
          'Jumping', 'Bouncing', 'Wallowing', 'Wanting', 'Wishing', 'Whirling', 'Trailing', 'Tailoring', 'Butchering', 'Rectifying', 'Wriggling', 'Gambling',
          'Smoking', 'Injecting', 'Enjoying', 'Enducing', 'Injuring', 'Annoying', 'Arguing', 'Discussing', 'Convincing', 'Flirting', 'Adoring', 'Worshipping',
          'Stripping', 'Blowing', 'Penetrating', 'Pecking', 'Humping', 'Biting', 'Spanking', 'Slapping', 'Rubbing', 'Fading', 'Drifting', 'Parting', 'Promising',
          'Happening', 'Willing', 'Yawning', 'Boring', 'Programming', 'Computing', 'Hugging', 'Cuddling', 'Roaming', 'Teetering', 'Finding', 'Setting', 'Frustrating',
          'Teething', 'Snarling', 'Barking', 'Mewing', 'Tapping', 'Drawing', 'Taping', 'Remarking', 'Resizing', 'Packaging', 'Disagreeing', 'Smirking', 'Staring',
          'Losing', 'Warning', 'Worrying', 'Presenting', 'Portraying', 'Joking', 'Pulling', 'Pushing', 'Thrusting', 'Motioning', 'Gesturing', 'Signing',
          'Rambling', 'Spreading', 'Imposing', 'Conducting', 'Intruding', 'Encroaching', 'Curtseying', 'Bowing', 'Tempting', 'Attempting', 'Inspiring',
          'Guiding', 'Divulging', 'Discrediting', 'Deceiving', 'Receiving', 'Conceiving', 'Retrieving', 'Manouvering', 'Planning', 'Manning', 'Facing', 'Gracing',
          'Lacing', 'Resolving', 'Issuing', 'Thanking', 'Lounging', 'Spunging', 'Mounting', 'Descending', 'Ascending', 'Mulling', 'Pointing', 'Dripping',
          'Dropping', 'Asking', 'Coming', 'Regurgitating', 'Absconding', 'Probing', 'Casting'],
			};
var nature = {
	name: 'Nature',
	array: ['Peach', 'Pineapple', 'Pear', 'Plum', 'Dragonfruit', 'Bunch of Bannanas', 'Kiwifruit', 'Carrot', 'Potato',
			    'Red onion', 'Oregano', 'Orange', 'Apricot', 'Avocado', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
          'Cucumber', 'Crab apples', 'Boysenberry', 'Currant', 'Cherry Tree', 'Cherimoya', 'Orchard', 'Wave',
          'Chico fruit', 'CloudBerry', 'Coconut', 'Cranberry', 'Damson', 'Date', 'Durian', 'Elderberry',
          'Feijoa', 'Fig', 'Goji berry', 'Rasin', 'Red grapes', 'Grapefruit', 'Giava', 'Honeyberry', 'Huckleberry',
          'Jabuticaba', 'Jackfruit', 'Sharonfruit', 'Jambul', 'Jujube', 'Juniper berry', 'Kumquat', 'Lemon',
          'Lime', 'Loquat','Longan', 'Chili pepper', 'Corn kernel', 'Eggplant', 'Aubergine', 'Olive', 'Hippopotamus',
          'Pea', 'Pumpkin', 'Squash', 'Tomato', 'Prune', 'Plumcot', 'Pomegranate', 'Pomelo', 'Lychee',
          'Mango', 'Mangosteen', 'Marionberry', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Melon', 'Miracle fruit',
          'Mulberry', 'Nectarine', 'Nance', 'Blood Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya',
          'Passionfruit', 'Persimmon', 'Plantain', 'Purple Mangosteen', 'Quince', 'Raspberry', 'Salmonberry',
          'Rambutan', 'Salal berry', 'Salak', 'Satsuma', 'Soursop', 'Carambola', 'Star fruit', 'Strawberry',
          'Tamarillo', 'Tamarind', 'Ugli fruit', 'Yuzu', 'Barn Owl', 'Barnacle Goose', 'Swan', 'Black Guillemot',
          'Blackbird', 'Seagull', 'Blue Tit', 'Robin', 'Brent Goose', 'Bullfinch', 'Buzzard', 'Coal Tit', 'Chaffinch',
          'Collared Dove', 'Cuckoo', 'Dipper', 'Dunlin', 'Feral Pigeon', 'Grasshopper Warbler', 'Hawk', 'Great Tit',
          'Partridge', 'Hen', 'Cow', 'Bull', 'Heifer', 'Honey Buzzard', 'House Sparrow', 'Woodpecker', 'Jay', 'Kestrel',
          'Kingfisher', 'Lapwing', 'Little Gull', 'Long-tailed Duck', 'Magpie', 'Merlin', 'Thrush', 'Moorhen', 'Mallard',
          'Ostercatcher', 'Pheasant', 'Puffin', 'Pink-footed Goose', 'Peregrine', 'Pied Flycatcher', 'Quail', 'Raven', 'Red Grouse',
          'Ruddy Duck', 'Sandwich Tern', 'Short-eared Owl', 'Snowy Owl', 'Sparrowhawk', 'Starling', 'Swallow', 'Skylark', 'Turtle Dove',
          'French Hen', 'Woodcock', 'Wren', 'Afghan Hound', 'Airedale Terrier', 'American Foxhound', 'Pit Bull', 'Eskimo Dog',
          'Labrador', 'German Shepherd', 'French bulldog', 'Golden Retriever', 'Beagle', 'Poodle', 'Rottweiler', 'Pointers',
          'Siberian Husky', 'Dachshund', 'Great Dane', 'Pembroke Welsh Corgy', 'Doberman Pinschers', 'Australian Shepherds',
          'Shih Tzu', 'Boston Terrier', 'Havanese', 'Spaniel', 'Pug', 'Chihuahuas', 'Basset Hound', 'Border Colly', 'Rhodesian Ridgeback',
          'St. Bernards', 'Scottish Terrier', 'Dalmation', 'Irish Wolfhound', 'Greyhound', 'Chow Chows', 'Black and Tan Coonhounds',
          'Pharaoh Hound', 'English Foxhound', 'Maine Coon', 'Persian Cat', 'Siamese Cat', 'Sphynx Cat', 'Lynx', 'Burmese Cat',
          'Oriental Shorthair', 'Savannah cat', 'Egyptian Mau', 'Havana Brown', 'Pixie-bob', 'Stallion', 'Mare', 'Calf', 'Donkey',
          'Siamese Fighting Fish', 'Guppy', 'Carp', 'Goldfish', 'Arapaima', 'Wels Catfish', 'Blobfish', 'Cobia', 'Ocean Sunfish',
          'Angelfish', 'Northern Pike', 'Angler', 'Suckermouth Catfish', 'Tench', 'Rainbow Trout', 'Perch', 'Mackarel', 'Palette Surgeonfish',
          'Great White Shark', 'Giant Oarfish', 'Common Roach', 'Mosquito Fish', 'Bass', 'Greenland Shark', 'Basking Shark',
          'Goblin Shark', 'Whale Shark', 'Dolphin', 'Blue Whale', 'Orca', 'Humpback Whale', 'Sperm Whale', 'Narwhal', 'Gray Whale',
          'Dwarf Sperm Whale', 'Anaconda', 'Vipers', 'Python', 'Black Mamba', 'Taipan', 'Cobra', 'Rattlesnake', 'Kingsnakes',
          'Garter Snake', 'Boa', 'Elephant Trunk Snake', 'False Cobra', 'Mole Snake', 'Badger', 'Fox', 'Tortoise', 'Turtle',
          'Bandicoot', 'Mole', 'Tapeworm', 'Guinea Pig', 'Chameleon', 'Elephant', 'Woolly Mammoth', 'Saber-toothed Tiger', 'Lion',
          'White Tiger', 'Snow Leopard', 'Cheetah', 'Panther', 'Lemur', 'Monkey', 'Bonobo', 'Gorilla', 'Orangutan', 'Human',
          'Chimpanzee', 'Gibbon', 'Red Panda', 'Neanderthal', 'Proconsul', 'Velvet Monkey', 'Baboon', 'Guinea Baboon', 'Green Monkey',
          'Red-faced Spider Monkey', 'Black Snub-nosed Monkey', 'Silvery Lutung', 'Giant Panda', 'Polar Bear', 'Brown Bear',
          'American Black Bear', 'Sloth', 'Ursinae', 'Spectacled Bear', 'Atlas Bear', 'Blue Bear', 'Hail Stones', 'Snow', 'Twister',
          'Whirlwind', 'Sleet', 'Tornado', 'Whirlpool', 'Diplodocus', 'Stegosaurus', 'Triceratops', 'Pterodactyl', 'Tyrannosaurus Rex',
          'Theropod', 'Velociraptor', 'Iguana', 'Crocodile', 'Aligator', 'Gecko', 'Salamander', 'Newt', 'Horned Lizard', 'Bearded Dragon',
          'Archaeopteryx', 'Hammerhead Shark', 'Penguin', 'Emperor Penguin', 'Yellow-eyed Penguin', 'King Penguin', 'Little Blue Penguin',
          'Dodo', 'Dire wolf', 'Ankylosaurus', 'Crested Penguin', 'Megabats', 'Flying Foxes', 'Vampire Bat', 'Goat', 'Pig', 'Sow', 'Piglet',
          'Rat', 'Mouse', 'Glass Frog', 'Poison dart frog', 'Fire-bellied Toad', 'Tomato Frog', 'Electric Eel', 'Mongoose', 'Monk Fish',
          'Meerkat', 'Butterfly', 'Moth', 'Beetle', 'Honeybee', 'Army Ants', 'Mosquito', 'LadyBird', 'Fly', 'Flea', 'Bed bug', 'Cricket',
          'Termite', 'Mantis', 'Dragonfly', 'Earwig', 'Louse', 'Aphid', 'Cicada', 'Mole Cricket', 'Jerusalem Cricket', 'Mayfly',
          'Snakefly', 'Azalea', 'Balloon flower', 'Balsam', 'Begonia', 'Bellflower', 'Blackeyed Susan', 'Bleeding Heart', 'Buttercup',
          'Butterfly Weed', 'California Poppy', 'Castor Bean', 'Chrysanthemum', 'Sage', 'Daisy', 'Foxglove', 'Geranium', 'Glory of the Snow',
          'Goatsbeard', 'Hollyhock', 'Hyacinth', 'Runner Bean', 'Fin', 'Rapeseed', 'Wheat', 'Grass', 'Cannabis', 'Japanese Knotweed', 'Dandelion',
          'Algae', 'Toadstool', 'Mushroom', 'Celery', 'Cabbage', 'Chickweed', 'Spinach', 'Turnip', 'Conifer', 'Palm Tree', 'Deciduous shrub', 'Northern Red Oak',
          'Almond', 'Peanut', 'Pistachio', 'Pecan', 'Bay laurel', 'European Beech', 'Brazil Nut', 'Weeping Willow', 'Silver birch', 'Camphor Tree',
          'Sugar Maple', 'Wasp', 'Parasite'],
        };

var person = {
  name: 'People and Characters',
  array: ['Charlie Chaplain', 'Hugh Jackman', 'Second Cousin', 'Rachel Bloom', 'Vasyl Lomachenko', 'Gervonta Davis', 'Sylvestor Stalone', 'Jennifer Aniston',
          'David Schwimmer', 'Matthew Perry', 'Matt LeBlanc', 'Lisa Kudrow', 'Courtney Cox', 'Brad Pitt', 'Angelina Jolie', 'Simon Cowell', 'Bruce Springsteen',
          'Meryl Streep', 'Speedy Gonzales', 'Romeo and Juliette', 'The Abbott of Westminster', 'Abraham', 'Jesus', 'Muhammad', 'Hamlet', 'Macbeth',
          'Aslan', 'Daniel Day-Lewis', 'Liam Neeson', 'Colin Farrell', 'Jamie Dornan', 'Michael Fassbender', 'Brendan Gleeson', 'Brian Gleeson', 'Domhnall Gleeson',
          'Richard Harris', 'Evanna Lynch', 'Cilian Murphy', 'James Nesbitt', 'Fiona Shaw', 'Saoirse Ronan', 'Stuart Townsend', 'Paul Rankin', 'Duke of York',
          'Duke of Edinburgh', 'Bono', 'Phil Coulter', 'Eva Cassidy', 'Nadine Coyle', 'Rory Gallagher', 'Bob Geldof', 'St. Thomas Aquinas', 'Niall Horan',
          'Harry Styles', 'Hozier', 'Ronan Keating', 'Michael Kelly', 'Sinéad O\'Connor', 'Daniel O\'Donnell', 'Katie Melua', 'Brian Friel', 'Seamus Heaney',
          'James Joyce', 'Oscar Wilde', 'Arthur Guiness', 'Sir Alec Guiness', 'Alan Partridge', 'John Cusack', 'Joan Cusack', 'Damien Duff', 'Edna Mode', 'Alex Higgins',
          'St. Patrick', 'Robbie Keane', 'John Hume', 'Sir John Major', 'Winston Churchill', 'Michael Collins', 'Éamon de Valera', 'Dr Ian Paisley',
          'Barry McGuigan', 'Paul O\'Connell', 'Brian O\'Driscoll', 'Gay Byrne', 'Dame Julie Andrews', 'Sacha Baron Cohen', 'Sean Bean', 'Christian Bale',
          'Hugh Laurie', 'Jude Law', 'Orlando Bloom', 'Sir Michael Caine', 'Helena Bonham Carter', 'Daniel Craig', 'Benedict Cumberbatch', 'Tom Felton',
          'Daniel Radcliffe', 'Simon Pegg', 'Christopher Eccleston', 'Ralph Fiennes', 'Arthur Miller', 'George Orwell', ],
};
var randomCategory = {
  name: 'Random',
  array: [],
};
// Order of Categories on the board is determined by this
// Settings page made like this? Made here?!
categories.push(objects);
categories.push(actions);
categories.push(nature);
categories.push(world);
categories.push(miscellaneous);


// Back up arrays
var backUpCategories = [];

var backUpObjects = [];
for(let poop = 0; poop < objects.array.length; poop++) {
	backUpObjects.push(objects.array[poop]);
}
var backUpActions = [];
for(let poop = 0; poop < actions.array.length; poop++) {
	backUpActions.push(actions.array[poop]);
}
var backUpNature = [];
for(let poop = 0; poop < nature.array.length; poop++) {
	backUpNature.push(nature.array[poop]);
}
var backUpWorld = [];
for(let poop = 0; poop < world.array.length; poop++) {
	backUpWorld.push(world.array[poop]);
}
var backUpMisc = [];
for(let poop = 0; poop < miscellaneous.array.length; poop++) {
	backUpMisc.push(miscellaneous.array[poop]);
}
var backUpPerson = [];
for(let poop = 0; poop < person.array.length; poop++) {
  backUpPerson.push(person.array[poop]);
}
var backUpInternets = [];
for(let poop = 0; poop < internets.array.length; poop++) {
  backUpInternets.push(internets.array[poop]);
}

backUpCategories.push(backUpObjects);
backUpCategories.push(backUpActions);
backUpCategories.push(backUpNature);
backUpCategories.push(backUpWorld);
backUpCategories.push(backUpMisc);

//Home Page on 17/04/18
var home_page = `<h1 class="mainTitle" id='topTitle'>Verbalise</h1>
                <div class="hidden" id='modal'>
                  <div id='modal-container'>
                      <p id='rulesContent'></p>
                      <div class='rules-bottom-bar' id='rules-bottom-bar'>
                        <img src='./resources/images/crossButton.jpg' id='closeRules'/>
                        <div id='rules-bottom-bar-right'>
                          <img id='nextArrow' src='./resources/images/nextArrow.png' alt='An Arrow'/>
                      </div>
                    </div>
                  </div>
                </div>

                <button class="btn initialBtn" type="button" id="rules">Rules</button>
                <button class="btn initialBtn" type="button" id="addItemBtn">Add Team</button>
                <div id='list'></div>
                <button class="btn initialBtn" id="readyBtn">Ready!</button>`;
