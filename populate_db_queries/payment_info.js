
var payment_info= [
    {
        User: 'lazybird937',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2018-07-01',
        Name_on_card:'larry jimenez'
    },
    {
        User: 'lazybird937',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-03-01',
        Name_on_card:'larry jimenez'
    },
    {
        User: 'beautifulmouse950',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2018-07-01',
        name_on_card: 'rene brooks'
    },
    {
        User: 'beautifulmouse950',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2020-07-01',
        name_on_card: 'rene brooks'
    },
    {
        User: 'yhzhao343',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-07-01',
        name_on_card: 'Yuhui'
    },
    {
        User: 'yhzhao343',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-01-01',
        name_on_card: 'Yuhui'
    },
    {
        User: 'silvergorilla475',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-01-01',
        name_on_card: 'asher wang'
    },
    {
        User: 'silvergorilla475',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2017-05-01',
        name_on_card: 'asher wang'
    },
    {
        User: 'whiteladybug301',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2020-01-01',
        name_on_card: 'kirk davis'
    },
    {
        User: 'whiteladybug301',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-06-01',
        name_on_card: 'kirk davis'
    },
    {
        User: 'orangemeercat994',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-06-01',
        name_on_card: 'elisa henry'
    },
    {
        User: 'organicwolf498',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2019-06-01',
        name_on_card: 'eva bouchard'
    },
    {
        User: 'browndog697',
        Card_number: Math.floor((1+Math.random())*100000000000).toString(),
        Saved: true,
        Cvv:Math.floor((1+Math.random())*100).toString(),
        Expiration_date:'2017-01-01',
        name_on_card: 'earl duncan'
    },
];

var may_june_movies = [
  {
    "Title": "CAPTAIN AMERICA: CIVIL WAR",
    "Release_date": "2016-05-06",
    "Rating" : "PG-13",
    "Length":  147,
    "Synopsis" : "With many people fearing the actions of super heroes, the government decides to push for the Hero Registration Act, a law that limits a hero's actions. This results in a division in The Avengers. Iron Man stands with this Act, claiming that their actions must be kept in check otherwise cities will continue to be destroyed, but Captain America feels that saving the world is daring enough and that they cannot rely on the government to protect the world. This escalates into an all-out war between Team Iron Man (Iron Man, Black Panther, Vision, Black Widow, War Machine, and Spiderman) and Team Captain America (Captain America, Bucky Barnes, Falcon, Sharon Carter, Scarlet Witch, Hawkeye, and Ant Man) while a new villain emerges.",
    "Cast" : "Chris Evans, Robert Downey Jr., Scarlett Johansson, Sebastian Stan, Anthony Mackie",
    "Genre": "Action/Adventure/Sci-Fi"
  },
  {
    "Title": "Alice Through the Looking Glass",
    "Release_date": "2016-05-27",
    "Rating" : "PG",
    "Length":  113,
    "Synopsis" : "Alice returns to the magical world of Underland, only to find the Hatter in a horrible state. With the help of her friends, Alice must travel through time to save the Mad Hatter and Underland's fate from the evil clutches of the Red Queen and a clock like creature, known as Time",
    "Cast" : " Mia Wasikowska, Johnny Depp, Helena Bonham Carter, Anne Hathaway, Sacha Baron Cohen",
    "Genre" : "Adventure/Family/Fantasy"
  },
  {
    "Title": "Independence Day: Resurgence",
    "Release_date": "2016-06-24",
    "Rating" : "PG-13",
    "Length":  120,
    "Synopsis" : "Two decades after the freak alien invasion that nearly destroyed mankind a new threat emerges. This Allen mothership is more than twice the size as the last one and once again, the world's armies must band together to save the world. Do they have enough firepower or will this battle change and will aliens take over?",
    "Cast" : "Liam Hemsworth, Jeff Goldblum, Bill Pullman, Maika Monroe, William Fichtner",
    "Genre": "Action/Adventure/Sci-Fi"
  },
  {
    "Title": "Central Intelligence",
    "Release_date": "2016-06-17",
    "Rating" : "PG-13",
    "Length":  107,
    "Synopsis" : "Calvin Joyner was voted in high school the guy most likely to succeed. 20 years later he's an accountant. As his high school reunion approaches, he tries to make contact with his old schoolmates. And someone named Bob Stone contacts him. He says that he was known as Robbie Weirdicht in school. Calvin remembers that he was picked on, as a matter of fact after an extremely nasty prank he left school. They agree to meet and Calvin is surprised by how much he has changed. Bob asks Calvin to help him out. He says yes and the next thing he knows some men burst into his home. They're CIA, the one in charge is looking for Stone, she says he's a rogue agent. When they can't find Bob they leave. Later he approaches Calvin telling him, he is not a rogue agent, he's trying to find a person known as the Balck Badger who is planning to sell some information that in the wrong hands can be disastrous. so he needs Calvin's help to stop him. Calvin's not sure whom he should believe.",
    "Cast" : "Dwayne Johnson, Kevin Hart, Danielle Nicolet, Danielle Nicolet, Jason Bateman",
    "Genre":" Action/Comedy/Crime"
  },
    {
    "Title": "The Shallows",
    "Release_date": "2016-06-24",
    "Rating" : "PG-13",
    "Length":  86,
    "Synopsis" : "In the taut thriller The Shallows, when Nancy (Blake Lively) is surfing on a secluded beach, she finds herself on the feeding ground of a great white shark. Though she is stranded only 200 yards from shore, survival proves to be the ultimate test of wills, requiring all of Nancy's ingenuity, resourcefulness, and fortitude.",
    "Cast" : "Blake Lively, Óscar Jaenada, Angelo Jose, Trujillo Salas, Brett Cullen",
    "Genre":"Drama/Horror/Thriller"
  }
]

module.exports = {
    payment_info : payment_info,
    may_june_movies: may_june_movies
}