![image](https://github.com/tcheric/sleep-tracker/assets/70047300/5a9350bb-771f-44b2-a6bc-91bd14b04275)

Z sleep tracker was an android app to track sleep data. The idea was to make a functional app where you could enter your sleep time in a single swipe. It was to have: 
* An input screen for what times you slept
* A calendar screen to display weekly sleeps in scrollable list format
* A graph screen to display weekly sleeps in a fancy graph format
* The app was also black and red so that you wouldn't laser your eyes using the app at night.


![image](https://github.com/tcheric/sleep-tracker/assets/70047300/16c18248-3c84-440a-87ec-c78ee809240c)

I originally made this app after i graduated uni and had no job. It took about a month to make and a bit longer to release on Google Play. After it released, it got very few downloads because it had some problems. Now Google Play keeps sending me annoying emails so I'll probably delete it. Also I feel bad for the guys still installing it... (IDK how they are, I can't even find the app on play store)

![image](https://github.com/tcheric/sleep-tracker/assets/70047300/f1f20e0c-1231-4859-ada1-c94515e24289)

Major Problems:
* Wouldn't work depending on screen size of device. In Android Studio you can change screen size while testing, but not in Expo Go, which was the recommended platform for React native dev. So I only tested it on my own phone (At least it works on my device)
* The input mechanism was not intuitive at all and there was no guide to show users how to use it. TBH its not very efficient anyway, more of a novelty thing.
* Also the app icon showed the default Expo adaptive icon because I didn't add the right icon to the right place in the config. whoops!
* The weekly dates are hardcoded into the app database in JSON format. The dates only went up to 31st Dec 2023. It would be really easy to enter in more dates, but...
* Initially I released the app with the help of Expo's EAS build (for building app binaries). After like a year I wanted to update the app, but I got some error because something changed. Don't remember what it was, but I struggled for like a week before I gave up because the only way was to migrate the project off Expo. So I cant update it even though I came up with a fix to problem #1 and a much cooler app icon.

![image](https://github.com/tcheric/sleep-tracker/assets/70047300/0f8ea317-d340-4564-a70e-1947b9865003)

(*Peep the sick new icon!*)
