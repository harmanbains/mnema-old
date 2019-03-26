# Mnema

#### Premise
Mnema is a 'Micro-journaling' App designed to help people mindfully manage their day to day thoughts and habits. Instead of journaling in a big chunk during the morning or evening, you are supposed to add your thoughts whenever the need should arise throughout your day, and review them later on to give yourself an objective glimpse into your mind and its ruminations. 

#### Usage
*"Man this coffee is making my heart pound"* and *"Just caught up with Dan, glad we had some time to just kick-back"* are both relavent thoughts to add to the journal as your day progresses. Later on, you will review these thoughts in the 'Review' screen and enter in any 'Realizations' you may have had. You may realize that you keep meaning to see a certain friend but haven't reached out, or that a particular habit is having a negative impact on your well-being. Repative entries of the similar thoughts are usually a good indication there is something you need to Realize about your thoughts/habits. These 'Realizations' can then be acted upon, helping you move towards a healthier, happier life.

#### Architecture 
An **ExpressJS** server creates a **REST API** saving Users and their data to a **MongoDB** server with **mongoose** as the ORM.
This is accessed by a client frontend built using **React** and **plain CSS** (for now, I will probably update to use CSS Grid in the future)
