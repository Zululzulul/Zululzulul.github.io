/* Portfolio content.
 * Edit designFocus, contact details, CV URL and project text here.
 * projectOrder sets independent ordering for All and each category.
 * Use existing project ids in those lists; ids also form shared case-study links.
 * Media paths are relative to index.html and work under a GitHub Pages project URL.
 */
window.PORTFOLIO = {
  "name": "Jakub Krzysiak",
  "email": "jake.krzysiak@gmail.com",
  "linkedin": "https://www.linkedin.com/in/jakub--krzysiak/",
  "cvUrl": "",
  "projects": [
    {
      "id": "greg-the-frog",
      "categories": [
        "team",
        "school"
      ],
      "categoryLabel": "Team project · Futuregames GP1",
      "title": "Greg the Frog: Burning Escape",
      "demo": false,
      "featured": true,
      "summary": "Designed and built both levels, from paper sketches to set dressing, and refined the frog’s movement feel.",
      "tags": [
        "Level design",
        "Movement feel"
      ],
      "role": "Level Designer",
      "team": "16 people",
      "duration": "3 weeks",
      "engine": "Unity",
      "cover": "assets/greg-the-frog-cover.png",
      "coverFit": "contain",
      "coverWidth": 1260,
      "coverHeight": 1000,
      "coverAlt": "Greg the Frog: Burning Escape cover artwork: a frog swinging above a burning forest, carrying smaller frogs.",
      "plateTitle": "Two levels · Unity",
      "showCoverCaption": false,
      "overview": "Greg the Frog is a platformer about rescuing frogs from a burning rainforest. Fire, damaged forest and machinery become more visible as players progress. Faster completion earns better time medals, creating a choice between spending time on rescues and pursuing a faster run.",
      "experience": "Feel the speed and excitement of being a frog, while facing the choice between escaping faster and rescuing others from a burning rainforest.",
      "contributions": [
        "Designed, blocked out and dressed both levels, testing routes, jumps and distances.",
        "Playtested the levels and revised their layout in response to feedback.",
        "Polished movement feel and prototyped a jump adjustment for better control at speed."
      ],
      "processTitle": "Building both levels",
      "processSteps": [
        [
          "Movement first",
          "I refined hopping and tongue movement, then used the character’s capabilities to shape the levels."
        ],
        [
          "Sketch and block out",
          "I sketched routes on paper and built blockouts in Unity, checking jumps and distances."
        ],
        [
          "Guide and dress",
          "I used colour-coded edges, particles and terrain to guide players along the main and alternative routes, then added set dressing."
        ]
      ],
      "levelComparison": [
        {
          "label": "Level 01",
          "title": "Tutorial with some openness",
          "text": "A tutorial leading into more open areas."
        },
        {
          "label": "Level 02",
          "title": "A linear route",
          "text": "A more directed route with fewer navigation choices."
        }
      ],
      "playtesting": "I tested with fellow students, teammates, my mentor and friends.",
      "before": "After the tutorial, the first level gave players more freedom, but finding the intended route was a problem.",
      "after": "I simplified and adjusted the layout while keeping some openness.",
      "outcomeLabel": "What I would change now",
      "outcome": "I would make the first level more linear, with fewer optional routes. The project schedule did not leave time for a full redesign.",
      "movementStudy": {
        "title": "Keeping control at high speed",
        "problem": "The frog hops instead of walking. At high speed, that rhythm made it difficult to time a jump near a platform edge.",
        "decision": "I prototyped a Space input that pushes the frog down, preserves forward momentum and triggers a jump on landing.",
        "intent": "Let the player control the take-off moment without losing speed.",
        "reflection": "The change improved the feel of jumping and made the game easier to play.",
        "comparisonNote": "Both examples use the updated movement. The missed jump illustrates a similar outcome to the original timing problem.",
        "clips": [
          {
            "title": "Without a timely jump",
            "url": "assets/greg-no-timely-jump.mp4",
            "poster": "assets/greg-no-timely-jump.jpg",
            "description": "Earlier, a jump could be missed even with correctly timed input. This clip illustrates a similar missed-jump outcome in the current system.",
            "loop": true,
            "type": "file"
          },
          {
            "title": "With a timed jump",
            "url": "assets/greg-timed-jump.mp4",
            "poster": "assets/greg-timed-jump.jpg",
            "description": "After the adjustment, input initiates the downward-and-jump response. This clip shows a successful timed jump.",
            "loop": true,
            "type": "file"
          }
        ]
      },
      "lesson": "More is not always better. Extra openness made the route harder to follow without adding enough to the experience. The linear level worked better for navigation and onboarding.",
      "teamLesson": "Changing someone else’s code directly taught me to agree on changes, respect each role’s responsibilities and communicate through prototypes. For the jump adjustment, I built the prototype and the programmer refined the implementation.",
      "mediaTitle": "Project video",
      "video": {
        "type": "youtube",
        "id": "Oufd0Ngkfu0"
      },
      "documents": [],
      "links": [
        {
          "title": "Play on itch.io",
          "url": "https://futuregames.itch.io/greg-the-frog"
        },
        {
          "title": "Watch on YouTube",
          "url": "https://www.youtube.com/watch?v=Oufd0Ngkfu0"
        }
      ],
      "processGallery": [
        {
          "src": "assets/greg-level-blockout.png",
          "title": "Blockout",
          "alt": "Editor view of the Greg the Frog level, with simple platforms, walls and tongue attachment markers defining the route.",
          "caption": "Testing the route, platform spacing and movement in blockout.",
          "width": 1422,
          "height": 714
        },
        {
          "src": "assets/greg-level-environment.png",
          "title": "Environment pass",
          "alt": "Editor view of the level with rock formations, vegetation and waterfalls replacing the simple blockout shapes.",
          "caption": "The level with environment assets placed around the playable route.",
          "width": 1313,
          "height": 695
        }
      ],
      "testingStudy": [
        {
          "label": "Design problem",
          "text": "After the tutorial, the first level’s open layout made the intended route hard to read. Players struggled to finish within the expected time."
        },
        {
          "label": "Design decision",
          "text": "I simplified and rearranged the layout while keeping some openness."
        },
        {
          "label": "Why this decision",
          "text": "Reduce navigation friction so players could focus on movement, rescues and their time."
        },
        {
          "label": "Observation",
          "text": "The more linear second level did not show the same navigation problem."
        }
      ],
      "reflectionTitle": "What I learned",
      "videoLink": {
        "title": "Watch on YouTube",
        "url": "https://www.youtube.com/watch?v=Oufd0Ngkfu0"
      },
      "cardPreview": {
        "type": "file",
        "url": "assets/greg-timed-jump.mp4",
        "title": "Greg the Frog gameplay preview"
      }
    },
    {
      "id": "frost-haul",
      "categories": [
        "team",
        "school"
      ],
      "categoryLabel": "Team project · Futuregames GP3",
      "title": "Frost Haul",
      "demo": false,
      "featured": true,
      "summary": "Built the moving world, navigation display and dynamic visual feedback. Prototyped the macro game loop in Godot.",
      "tags": [
        "Technical design",
        "Level design"
      ],
      "role": "Technical / Level Designer",
      "team": "11 people",
      "duration": "7 weeks",
      "engine": "Unreal Engine · Godot prototype",
      "cover": "assets/frosthaul-cover.png",
      "coverWidth": 630,
      "coverHeight": 500,
      "coverFit": "contain",
      "coverAlt": "Frost Haul cover art: a steam locomotive crossing a snowy landscape beneath a dark plume of smoke, with the game title below.",
      "plateTitle": "World systems & navigation",
      "showCoverCaption": false,
      "experience": "Survive a snow apocalypse as one of the few people left, keeping the train running with another player.",
      "experienceDetail": "Feel the constant pressure of repairing the train and coordinating with your partner while carrying supplies to people in shelters.",
      "contributions": [
        "Designed and implemented the moving environment and segment recycling.",
        "Built the navigation map’s visual layer and state updates.",
        "Prototyped route planning and resource management in Godot.",
        "Integrated art assets and helped teammates with replication.",
        "Created in-world displays and dynamic materials for displays, frost effects and doors."
      ],
      "caseSections": [
        {
          "id": "overview",
          "title": "Project context",
          "navTitle": "Project context",
          "paragraphs": [
            "Frost Haul is a cooperative train game set during a snow apocalypse. Players deliver cargo to shelter survivors while managing fuel and repairs."
          ]
        },
        {
          "id": "prototype",
          "title": "Prototyping the macro game loop",
          "navTitle": "Godot prototype",
          "note": "Godot",
          "paragraphs": [
            "I built a turn-based Godot prototype in one day to test route planning and resource management: cargo trading, cargo-dependent fuel use, damage and repairs.",
            "Each junction offered two choices: left or right. I used the prototype to test the map layout and whether the macro game loop held together."
          ],
          "video": {
            "type": "file",
            "url": "assets/frosthaul-godot-prototype.mp4",
            "poster": "assets/frosthaul-godot-prototype.jpg",
            "title": "Godot macro game loop prototype",
            "width": 1920,
            "height": 1080,
            "loop": true
          },
          "videoCaption": "Route choices, deliveries and train resources.",
          "callout": {
            "label": "What I learned from the prototype",
            "text": "The loop was simple and engaging enough to bring into the game. Prototyping let me check the routes and explore balancing before full implementation."
          }
        },
        {
          "id": "world",
          "title": "Building a moving world",
          "navTitle": "World movement",
          "statements": [
            {
              "label": "Design problem",
              "text": "Objects inside the train are physical: players can throw and roll them. Moving the train itself would add complexity to physics and player replication in multiplayer."
            },
            {
              "label": "Design decision",
              "text": "I designed a system that keeps the train in place and moves the environment around it. I implemented the visual world generation, movement logic and segment recycling."
            },
            {
              "label": "Why this decision",
              "text": "The train provides a stationary space for players and loose objects, while the scenery creates the sense of travel. This simplified the physics and replication work for our project."
            }
          ],
          "flow": [
            {
              "title": "Place segments ahead",
              "text": "Environment segments appear in front of the train."
            },
            {
              "title": "Move the environment",
              "text": "The segments pass the train while the train itself stays in place."
            },
            {
              "title": "Reuse each segment",
              "text": "Once a segment is far enough behind, move it back to the front."
            }
          ]
        },
        {
          "id": "navigation",
          "title": "The navigation map",
          "navTitle": "Navigation map",
          "paragraphs": [
            "I designed and implemented the map’s visual layer and updates to its displayed state."
          ],
          "gallery": [
            {
              "src": "assets/frosthaul-map-sketch.png",
              "title": "Map design sketch",
              "alt": "Hand-drawn design for Frost Haul’s navigation map.",
              "caption": "Planning the route layout before implementing the display."
            }
          ],
          "clips": [
            {
              "type": "file",
              "title": "Train position",
              "url": "assets/frosthaul-map-movement.mp4",
              "poster": "assets/frosthaul-map-movement.jpg",
              "width": 1920,
              "height": 1080,
              "loop": true,
              "description": "Updating the displayed train position as it travels between nodes."
            },
            {
              "type": "file",
              "title": "Train route choice",
              "url": "assets/frosthaul-turning.mp4",
              "poster": "assets/frosthaul-turning.jpg",
              "width": 1920,
              "height": 1080,
              "loop": true,
              "description": "Showing the direction selected at a junction."
            }
          ]
        },
        {
          "id": "endgame",
          "title": "Giving the journey an end goal",
          "navTitle": "An end goal",
          "statements": [
            {
              "label": "Design problem",
              "text": "The game continues indefinitely. Without an end goal, players struggle to find a sense of purpose, progression or a narrative for the journey."
            },
            {
              "label": "How I would change it now",
              "text": "I would give players a shared goal, such as delivering special cargo, meeting a quota or finishing within a time limit."
            },
            {
              "label": "Why this change",
              "text": "A clear objective would give the journey a direction and let players judge their progress."
            }
          ]
        },
        {
          "id": "art",
          "title": "Working with artists",
          "navTitle": "Art integration",
          "paragraphs": [
            "I described and sketched model requirements, reviewed assets and integrated them into the scene."
          ],
          "examples": {
            "title": "Examples of my work",
            "items": [
              "Programmed the artist’s snow mask to respond to the train’s temperature.",
              "Added turning cogs and other visual feedback using dynamic materials.",
              "Adjusted lighting and object placement with the artists’ advice, and organised the project’s folders."
            ]
          }
        },
        {
          "id": "team",
          "title": "What I learned",
          "navTitle": "What I learned",
          "paragraphs": [
            "I helped teammates with replication when clients saw different objects, map locations, labels or values."
          ],
          "callout": {
            "label": "Skills developed",
            "items": [
              "Working with artists, programmers and other designers, with clearer responsibilities.",
              "Replication and passing information between systems.",
              "Dynamic materials and integrating C++ functions with Blueprints.",
              "Designing clearer UX: what players notice, understand and expect.",
              "Building spaces that make sense for the player."
            ]
          }
        }
      ],
      "mediaTitle": "Project video",
      "video": {
        "type": "file",
        "url": "assets/frosthaul-gameplay.mp4",
        "poster": "assets/frosthaul-gameplay.jpg",
        "title": "Frost Haul — gameplay",
        "width": 1280,
        "height": 720
      },
      "documents": [],
      "links": [
        {
          "title": "Play on itch.io",
          "url": "https://futuregames.itch.io/frosthaul"
        },
        {
          "title": "Watch on YouTube",
          "url": "https://www.youtube.com/watch?v=3c1KzkYlINs"
        }
      ],
      "videoLink": {
        "title": "Watch on YouTube",
        "url": "https://www.youtube.com/watch?v=3c1KzkYlINs"
      },
      "cardPreview": {
        "type": "file",
        "url": "assets/frosthaul-card-preview.mp4",
        "title": "Frost Haul gameplay preview"
      }
    },
    {
      "id": "stay-quiet",
      "categories": [
        "personal",
        "school"
      ],
      "categoryLabel": "Solo project · School assignment",
      "title": "Stay Quiet",
      "demo": false,
      "featured": true,
      "summary": "Designed and built a 2D sound-driven horror game where each sound you make is a threat.",
      "tags": [
        "Systems design",
        "Level design"
      ],
      "role": "Game Designer / Developer",
      "team": "Solo",
      "duration": "25 days",
      "engine": "Unity",
      "cover": "assets/stayquiet-title.png",
      "coverFit": "brand",
      "coverWidth": 200,
      "coverHeight": 64,
      "coverAlt": "Stay Quiet game title in red and black pixel art.",
      "coverLogo": "assets/stayquiet-ducktopus.png",
      "coverLogoAlt": "Ducktopus logo.",
      "plateTitle": "Sound, tension & escape",
      "showCoverCaption": false,
      "experience": "A challenging, immersive experience where one wrong move can be fatal, but careful planning and resourcefulness are rewarded.",
      "contributions": [
        "Designed and implemented the game’s systems, enemy behaviour and interactions.",
        "Built a compact, carefully polished house map packed with environmental storytelling.",
        "Created 2D pixel art for the environment, UI and characters.",
        "Playtested and iterated on navigation, balance and enemy behaviour."
      ],
      "caseSections": [
        {
          "id": "overview",
          "title": "Project context",
          "paragraphs": [
            "Stay Quiet is a 2D top-down horror game inspired by immersive sims. The player wakes in the basement of a blind killer, searches for a key and tries to escape. Sound attracts the enemy; the pistol only stuns him temporarily, and ammunition is limited.",
            "The player’s flashlight is the only light source. The rest of the house stays dark, limiting what the player can see while moving through it.",
            "Bodies and victims’ eyes placed around the house communicate the killer’s obsession with his blindness through the environment.",
            "I completed this school assignment solo in 25 days, including the design, code, art and music. Sound effects came from free online assets."
          ]
        },
        {
          "id": "noise",
          "title": "Giving the player control over noise",
          "navTitle": "Noise & interaction",
          "statements": [
            {
              "label": "Design problem",
              "text": "Bumping into boxes, doors or traps creates noise. The player needs a deliberate way to move through the house without constantly attracting the enemy."
            },
            {
              "label": "Design decision",
              "text": "I added push and pull interactions that let players move objects quietly at the cost of time. They can arrange obstacles to plan escape routes, or deliberately make noise with a gunshot to draw the enemy away."
            },
            {
              "label": "Why this decision",
              "text": "Moving carefully takes longer, but gives the player control over noise and a way to prepare for a chase."
            }
          ],
          "clips": [
            {
              "type": "file",
              "title": "Push",
              "url": "assets/stayquiet-push.mp4",
              "poster": "assets/stayquiet-push.jpg",
              "width": 1920,
              "height": 1080,
              "loop": true,
              "description": "Move an obstacle without the noise of a collision."
            },
            {
              "type": "file",
              "title": "Pull",
              "url": "assets/stayquiet-pull.mp4",
              "poster": "assets/stayquiet-pull.jpg",
              "width": 1920,
              "height": 1080,
              "loop": true,
              "description": "Reposition objects while controlling the interaction."
            }
          ]
        },
        {
          "id": "destruction",
          "title": "Destructible obstacles",
          "navTitle": "Destructible objects",
          "statements": [
            {
              "label": "Design problem",
              "text": "The enemy could get stuck behind crates, doors and chairs — the same objects the player could bump into and make noise."
            },
            {
              "label": "Design decision",
              "text": "I gave these objects HP. When the enemy collides with one, he damages it and briefly stops. The object breaks when its HP reaches zero."
            },
            {
              "label": "Why this decision",
              "text": "Obstacles should delay the enemy without making the player permanently safe. This also lets players prepare escape routes or bait the enemy into objects during a chase."
            }
          ],
          "video": {
            "type": "file",
            "url": "assets/stayquiet-destructible-objects.mp4",
            "poster": "assets/stayquiet-destructible-objects.jpg",
            "title": "Enemy damaging and destroying obstacles",
            "width": 1920,
            "height": 1080,
            "loop": true
          },
          "videoCaption": "Objects buy the player time, but repeated collisions destroy them."
        },
        {
          "id": "feedback",
          "title": "Making danger readable",
          "navTitle": "Enemy feedback",
          "statements": [
            {
              "label": "Design problem",
              "text": "Players needed clearer feedback about what the enemy was doing."
            },
            {
              "label": "Design decision",
              "text": "After playtesting, I added coloured screen borders to distinguish investigation from an active chase."
            },
            {
              "label": "Why this decision",
              "text": "The feedback helps players understand when they have made a sound and when they need to escape."
            }
          ],
          "galleryPaired": true,
          "gallery": [
            {
              "src": "assets/stayquiet-investigating.png",
              "title": "Investigating a sound",
              "alt": "Stay Quiet gameplay with a yellow screen border indicating that the enemy heard a sound.",
              "width": 2043,
              "height": 1148,
              "caption": "Yellow border and heartbeat: the enemy moves towards the last sound he heard."
            },
            {
              "src": "assets/stayquiet-chasing.png",
              "title": "Active chase",
              "alt": "Stay Quiet gameplay with a red screen border indicating an active chase.",
              "width": 2039,
              "height": 1162,
              "caption": "Red border: the enemy is chasing. Outside the finale, he stops after losing the player for a while."
            }
          ]
        },
        {
          "id": "ending",
          "title": "Changing the pace at the end",
          "navTitle": "Final escape",
          "statements": [
            {
              "label": "Design problem",
              "text": "In the first version, opening the final door felt anticlimactic."
            },
            {
              "label": "Design decision",
              "text": "I added a garage escape. Opening the final door triggers a continuous chase, and the player must open the garage door to get out."
            },
            {
              "label": "Why this decision",
              "text": "I wanted to shift from cautious exploration to a stressful final escape, pushing the player to use their remaining resources."
            }
          ],
          "video": {
            "type": "file",
            "url": "assets/stayquiet-ending.mp4",
            "poster": "assets/stayquiet-ending.jpg",
            "title": "Stay Quiet — final escape",
            "width": 1920,
            "height": 1080
          },
          "videoCaption": "The garage escape changes the pace to a continuous chase."
        },
        {
          "id": "testing",
          "title": "Playtesting & iteration",
          "navTitle": "Playtesting",
          "paragraphs": [
            "I ran many playtests and used the feedback to revise the game."
          ],
          "examples": {
            "title": "Changes from testing",
            "items": [
              "Added a map to support navigation.",
              "Adjusted game balance and enemy behaviour.",
              "Added screen borders to make changes in danger easier to recognise."
            ]
          }
        },
        {
          "id": "reflection",
          "title": "What I learned",
          "paragraphs": [
            "I learned how to build tension through pacing, communicate a story through the environment, and connect interactions, enemy behaviour and feedback into a coherent set of systems."
          ]
        }
      ],
      "mediaTitle": "Play Stay Quiet",
      "documents": [],
      "links": [
        {
          "title": "Play on itch.io",
          "url": "https://zululzulul.itch.io/stay-quiet"
        }
      ],
      "mediaLinksOnly": true,
      "cardPreview": {
        "type": "file",
        "url": "assets/stayquiet-card-preview.mp4",
        "title": "Stay Quiet gameplay preview"
      }
    },
    {
      "id": "count-corpula",
      "title": "Count Corpula",
      "role": "Technical Designer / Programmer",
      "team": "6 people",
      "duration": "1 week",
      "engine": "Unreal Engine 5.8 · Blueprints",
      "summary": "Designed and built computer minigames, scoring systems and random selection of bad employees, entirely in Blueprints.",
      "experience": "Be the company’s best employee while surviving on the blood of its bad employees.",
      "cover": "assets/count-corpula-cover.png",
      "coverAlt": "Count Corpula title in white lettering against a black and red background.",
      "contributions": [
        "Designed and implemented computer minigames.",
        "Built scoring, multipliers and random selection of bad employees.",
        "Created a candlestick display for the company’s money.",
        "Iterated on systems, minigame solvability and pacing."
      ],
      "categories": [
        "team",
        "jam"
      ],
      "categoryLabel": "Team project · Hello GameJam",
      "featured": true,
      "demo": false,
      "tags": [
        "Technical design",
        "Minigame design"
      ],
      "coverFit": "contain",
      "coverWidth": 960,
      "coverHeight": 300,
      "coverWide": true,
      "showCoverCaption": false,
      "plateTitle": "Computer minigames · Blueprints",
      "award": {
        "result": "3rd place",
        "event": "Hello GameJam",
        "theme": "Symbiosis"
      },
      "cardPreview": {
        "type": "file",
        "url": "assets/count-corpula-stocks-game.mp4",
        "title": "Count Corpula trading minigame"
      },
      "mediaTitle": "Play the game",
      "mediaLinksOnly": true,
      "links": [
        {
          "title": "Play on itch.io",
          "url": "https://zabiii.itch.io/count-corpula"
        }
      ],
      "caseSections": [
        {
          "id": "context",
          "title": "Project context",
          "paragraphs": [
            "The jam’s theme was symbiosis. A vampire works for a corporation: he earns money for the company, and it lets him feed on bad employees who are not doing their jobs.",
            "I designed and built the computer minigames and their rules, the money collection and scoring systems, and the random selection of bad employees. I implemented these systems entirely in Blueprints.",
            "Across all minigames, the third mistake ends the task and costs money."
          ],
          "navTitle": "Project context"
        },
        {
          "id": "cv-picker",
          "title": "Hiring employees: guaranteeing a valid team",
          "rules": [
            {
              "label": "Team limit",
              "text": "Up to 4 employees"
            },
            {
              "label": "Win condition",
              "text": "Each of 3 skill totals ≥ 10"
            }
          ],
          "statements": [
            {
              "label": "Design problem",
              "text": "Some candidate pools had no winning combination. Players could make reasonable choices and still have no way to succeed."
            },
            {
              "label": "Design decision",
              "text": "I prepared a list of valid three-person combinations and mixed one randomly selected trio into each candidate pool. The remaining candidates are generated from archetypes designed to roughly complement one another across the three skills."
            },
            {
              "label": "Why this decision",
              "text": "Keep the team-building puzzle while ensuring that a winning team is always available."
            }
          ],
          "navTitle": "Hiring employees",
          "video": {
            "type": "file",
            "url": "assets/count-corpula-cv-picker.mp4",
            "poster": "assets/count-corpula-cv-picker.jpg",
            "title": "Selecting employees to meet three skill requirements",
            "width": 1920,
            "height": 1080,
            "loop": true
          }
        },
        {
          "id": "typing",
          "title": "Typing an email: faster rewards",
          "paragraphs": [
            "The player copies highlighted text from an email."
          ],
          "statements": [
            {
              "label": "Design problem",
              "text": "The first version required typing the whole email, which was not very engaging. The task needed to offer a quick, accessible reward and fit the pace of the other minigames."
            },
            {
              "label": "Design decision",
              "text": "I shortened the task by randomly selecting just one sentence from the email for the player to type."
            },
            {
              "label": "Why this decision",
              "text": "Make rewards quicker to reach while keeping accuracy relevant."
            }
          ],
          "navTitle": "Typing an email",
          "video": {
            "type": "file",
            "url": "assets/count-corpula-typing-game.mp4",
            "poster": "assets/count-corpula-typing-game.jpg",
            "title": "Typing one highlighted sentence from an email",
            "width": 1920,
            "height": 1080,
            "loop": true
          }
        },
        {
          "id": "stocks",
          "title": "Trading shares: weighted price changes",
          "paragraphs": [
            "The player starts with one share, can make five purchases and must reach a money target. The final sale ends the round and determines whether the target was met."
          ],
          "statements": [
            {
              "label": "Design goal",
              "text": "Make the price move up and down, creating opportunities to buy and sell."
            },
            {
              "label": "Design decision",
              "text": "I used weighted randomness for price changes: low prices are more likely to rise, while high prices are more likely to fall."
            },
            {
              "label": "Why this decision",
              "text": "Keep the game flowing and reward quick thinking."
            }
          ],
          "navTitle": "Trading shares",
          "video": {
            "type": "file",
            "url": "assets/count-corpula-stocks-game.mp4",
            "poster": "assets/count-corpula-stocks-game.jpg",
            "title": "Buying and selling shares to reach a money target",
            "width": 1920,
            "height": 1080,
            "loop": true
          }
        },
        {
          "id": "scoring",
          "title": "Connecting feeding and scoring",
          "paragraphs": [
            "At regular intervals, my system randomly selects bad employees, up to a maximum of ten. Players recognise them through changes in their animation and monitor display.",
            "Feeding on a bad employee increases the multiplier applied to minigame points. This connects feeding with productivity. I also built the candlestick display showing the company’s money."
          ],
          "navTitle": "Feeding & scoring",
          "video": {
            "type": "file",
            "url": "assets/count-corpula-profit-chart.mp4",
            "poster": "assets/count-corpula-profit-chart.jpg",
            "title": "The company’s money display",
            "width": 1920,
            "height": 1080,
            "loop": true
          },
          "videoCaption": "The company’s money display, separate from the trading minigame."
        },
        {
          "id": "reflection",
          "title": "Playtesting & what I learned",
          "statements": [
            {
              "label": "Observation",
              "text": "After guaranteeing valid employee combinations and shortening the typing task, I saw a clear improvement in playtests."
            },
            {
              "label": "What I learned",
              "text": "This project gave me the most experience with building gameplay systems inside widgets. Creating the candlestick chart and handling the typing game were new areas for me."
            }
          ],
          "navTitle": "Testing & lessons"
        }
      ]
    },
    {
      "id": "interactive-western-sequence",
      "title": "Narrative Design Assignment",
      "categories": [
        "personal",
        "school"
      ],
      "categoryLabel": "School assignment · Futuregames",
      "featured": true,
      "demo": false,
      "summary": "Created an interactive western sequence, combining cinematic and environmental storytelling.",
      "role": "Narrative Designer",
      "team": "Solo",
      "duration": "3 weeks",
      "engine": "Unreal Engine · Sequencer",
      "tags": [
        "Narrative design",
        "Cinematics"
      ],
      "plateTitle": "Narrative sequence · Unreal Engine",
      "cover": "assets/interactive-western-cover.png",
      "coverAlt": "A lantern lights a grave marked by a wooden cross and cowboy hat, overlooking a western town at night.",
      "coverWidth": 2048,
      "coverHeight": 1020,
      "coverFit": "contain",
      "coverWide": true,
      "showCoverCaption": false,
      "experience": "Feel the anticipation of a western showdown, then experience it firsthand.",
      "contributions": [
        "Designed the narrative sequence, dialogue and scene composition.",
        "Created the cinematics in Sequencer, shaping camera work, timing and tension.",
        "Built the sequence’s transitions and conclusion."
      ],
      "hideMedia": true,
      "projectJump": {
        "section": "sequence",
        "label": "Explore the sequence"
      },
      "caseSections": [
        {
          "id": "context",
          "title": "Project context",
          "navTitle": "Project context",
          "paragraphs": [
            "A short revenge story built around a high-noon duel, created for a Futuregames assignment focused on Unreal Engine’s Sequencer."
          ]
        },
        {
          "id": "sequence",
          "title": "Building the sequence",
          "navTitle": "Three-part sequence",
          "flow": [
            {
              "title": "Establishing the motive",
              "text": "An early view of the father’s grave and a short dialogue introduce the revenge story."
            },
            {
              "title": "Establishing the duel",
              "text": "The confrontation builds anticipation for the high-noon showdown."
            },
            {
              "title": "Resolving the duel",
              "text": "After the showdown, the sequence returns to the opening scene to bring the story to a close."
            }
          ]
        },
        {
          "id": "intention",
          "title": "Design intention",
          "navTitle": "Design intention",
          "paragraphs": [
            "I focused on sustaining tension through framing, pacing and music. The sequence pays homage to classic westerns, using music by Ennio Morricone."
          ]
        }
      ],
      "video": {
        "type": "file",
        "url": "assets/narrative-design-assignment.mp4",
        "poster": "assets/interactive-western-cover.png",
        "title": "Narrative Design Assignment — complete sequence",
        "width": 1280,
        "height": 720
      },
      "videoInIntro": true,
      "cardPreview": {
        "type": "file",
        "url": "assets/narrative-design-preview.mp4",
        "title": "Narrative Design Assignment preview"
      }
    }
  ],
  "designFocus": "Combining engaging gameplay with immersive, narrative-driven experiences that make you think.",
  "projectOrder": {
    "all": [
      "greg-the-frog",
      "frost-haul",
      "stay-quiet",
      "count-corpula",
      "interactive-western-sequence"
    ],
    "team": [
      "greg-the-frog",
      "frost-haul",
      "count-corpula"
    ],
    "personal": [
      "stay-quiet",
      "interactive-western-sequence"
    ],
    "jam": [
      "count-corpula"
    ],
    "school": [
      "greg-the-frog",
      "frost-haul",
      "stay-quiet",
      "interactive-western-sequence"
    ]
  }
};
