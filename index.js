const mainDiv = document.querySelector('div.main-display');
const userInfo = document.querySelector('div.user-info');
let navUl = document.querySelector('ul.nav-ul');
let allUsers;
let allGames;
let currentUser;
let currentGame;
let currentUserGame;
let currentUserGameList;
let selectedUser;
let selectedBadge;

loginEvent();
navUlEvent();
fetchAllGames();
// handleLogOut();
function fetchAllGames(){
    fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(gamesArr => {
        allGames = gamesArr;
        mainDiv.innerHTML = "";
        allGames.forEach(game => {
            let imgDiv = document.createElement('div');
            imgDiv.className = 'image-div';
            let img = document.createElement('img');
            img.className = "game-image";
            img.src = game.image;
            img.dataset.id = game.id;
            imgDiv.append(img);
            mainDiv.append(imgDiv);
        })
    })
}
function navUlEvent(){
    navUl.addEventListener('click', function(e){
        if (e.target.matches('li#signup')){
            userInfo.innerHTML = `
            <div class="signup-form">
                <form id="new-user">
                    <h2>Sign Up</h2>
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="new-name" /><br>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="new-email" /><br>
                    <label for="username">Username: </label>
                    <input type="text" name="username" id="new-username" /><br>
                    <label for="age">Age: </label>
                    <input type="number" name="age" id="new-age" /><br>
                    <label for="location">Location: </label>
                    <select name="location" id="new-location">
                    <option value="" selected="selected">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    </select><br>
                    <label for="image">Image: </label>
                    <input type="text" name="image" id="new-image" /><br>
                    <input type="submit" value="Create Account" />
                </form>
            </div>
            `;
            createAccEvent();
            mainDivEvent();

        } else if (e.target.matches('li#login')){
            userInfo.innerHTML = `
            <form id="login-form">
                <h1>Login:</h1>
                <label for="email">Email: </label>
                <input type="email" name="email" id="login-email" placeholder="Insert Email Here" /><br>
                <label for="username">Username: </label>
                <input type="text" name="username" id="login-username" placeholder="Insert Username Here"/><br>
                <input type="submit" value="Login" />
            </form>
            `;
            loginEvent();
        } else if (e.target.matches('li#games')){
            fetchAllGames();
        } else if (e.target.matches('li#users')){
            mainDiv.innerHTML = "";
            loadAllUsersToMainDiv();
            mainDivEvent();
        } else if (e.target.matches('li#badges')){
            mainDiv.innerHTML = "";
            loadAllBadgesToMainDiv();
            mainDivEvent();
        }
    })
}
function createAccEvent(){
    const signUpForm = document.querySelector('form#new-user');
    signUpForm.addEventListener('submit', function(e){
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let username = e.target.username.value;
        let age = e.target.age.value;
        let location = e.target.location.value;
        let image = e.target.image.value;
        let newUser = {
            name: name,
            email: email,
            username: username,
            age: age,
            location: location,
            image: image
        }
        addNewUserToDB(newUser);
    })
}
function addNewUserToDB(newUser){
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(user => {
        currentUser = user;
        userInfo.innerHTML = `
            <div class="user-page-info">
                <div class="user-info-div">
                    <h1 id='name'>Welcome: ${currentUser.name}</h1><br>
                    <h2 id='email'>Email: ${currentUser.email}</h2><br>
                    <h2 id='username'>Username: ${currentUser.username}</h2><br>
                    <h3 id='age'>Age: ${currentUser.age}</h3><br>
                    <h3 id='location'>Location: ${currentUser.location}</h3><br>
                    <h4 id='status'>Status: ${userStatus(currentUser.status)}</h4>
                </div>
                <div class="user-friendship-info">
                    <h1>Following:</h1>
                    <ul class="following">
                    </ul>
                </div>
            </div>
            <div class="game-info-div">
                <div class="user-game-list">
                    <h1>Game List: </h1>
                    <ul id= "user-game-list">
                    </ul>
                </div>
                <div class="user-badge-list">
                    <h1>Badge List: </h1>
                    <ul id= "user-badge-list">
                    </ul>
                </div>
            </div>
        `;
        navUl.innerHTML = `
            <li class='nav-selection' id='welcome'>Welcome: ${currentUser.name}</li>
            <li class='nav-selection' id='badges'>Badges</li>
            <li class='nav-selection' id='games'>Games</li>
            <li class='nav-selection' id='users'>Users</li>
        `;
    })
}
function userStatus(status){
    if (status) {
        return "Online";
    } else {
        return "Offline";
    }
}
function loginEvent(){
    const loginForm = document.querySelector('form#login-form');
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        let loginEmail = e.target.email.value;
        let loginUsername = e.target.username.value;
        let loginObj = {
            email: loginEmail,
            username: loginUsername
        }
        fetchLoggedInUser(loginObj);
        let formDiv = document.createElement('div');
        formDiv.className = 'form-div';
        formDiv.innerHTML = `
        <form id="create-new-game">
            <h1>Don't See Your Game? Add it! </h1>
            <label for="name">Name: </label>
            <input type="text" name="name" id="new-game-name" placeholder="Enter New Game Name">
            <label for="genre">Genre: </label>
            <input type="text" name="genre" id="new-game-genre" placeholder="Enter New Game Genre">
            <label for="image">Image: </label>
            <input type="text" name="image" id="new-game-image" placeholder="Enter New Game Image URL">
            <input type="submit" value="Create New Game!">
        </form>
       `;
       //needs event listener
        mainDiv.append(formDiv);
        mainDivEvent();
    })
}
function fetchLoggedInUser(loginObj){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(usersArr => {
        allUsers = usersArr;
        if (allUsers.find(user => user.email === loginObj.email && user.username === loginObj.username)){
            currentUser = allUsers.find(user => user.email === loginObj.email && user.username === loginObj.username);
            currentUserGameList = currentUser.games;
            currentUserGame = currentUser.user_games;
            userInfo.innerHTML = `
            <div class="user-page-info">
                <div class="user-info-div">
                    <h1 id='name'>Welcome: ${currentUser.name}</h1>
                    <h2 id='email'>Email: ${currentUser.email}</h2>
                    <h2 id='username'>Username: ${currentUser.username}</h2>
                    <h3 id='age'>Age: ${currentUser.age}</h3>
                    <h3 id='location'>Location: ${currentUser.location}</h3>
                    <h4 id='status'>Status: ${userStatus(currentUser.status)}</h4>
                </div>
                <div class="user-friendship-info">
                    <h1>Following:</h1>
                    <ul class="following">
                    </ul>
                </div>
            </div>
            <div class="game-info-div">
                <div class="user-game-list">
                    <h1>Game List: </h1>
                    <ul id= "user-game-list">
                    </ul>
                </div>
                <div class="user-badge-list">
                    <h1>Badge List: </h1>
                    <ul id= "user-badge-list">
                    </ul>
                </div>
            </div>
            `;
            navUl.innerHTML = `
                <img src='${currentUser.image}' alt="${currentUser.name}'s picture" id='profile-image' width=75 height=75>
                <li class='nav-selection' id='welcome'>Welcome: ${currentUser.name}</li>
                <li class='nav-selection' id='badges'>Badges</li>
                <li class='nav-selection' id='games'>Games</li>
                <li class='nav-selection' id='users'>Users</li>
            `;
            let profileImage = document.querySelector('img#profile-image')
            profileImage.addEventListener('click', function(e){
                location.reload();
            })
            let userGameList = document.querySelector('ul#user-game-list');
            currentUserGameList.forEach(game => {
                let li = document.createElement('li');
                li.textContent = game.name;
                let cGame = currentUserGame.find(uGame => uGame.game_id === game.id)
                li.dataset.id = cGame.id;
                let delBtn = document.createElement('button');
                delBtn.textContent = "Delete";
                li.append(delBtn);
                userGameList.append(li);
                delBtn.addEventListener('click', function(e){
                    let liElem = e.target.parentElement;
                    let liId = liElem.dataset.id;
                    fetch(`http://localhost:3000/user_games/${liId}`,{
                        method: "DELETE",
                    });
                    userGameList.removeChild(liElem);
                })
            }
            )
            statusEvent();
            let followingList = document.querySelector('ul.following')
            currentUser.followees.forEach(follower => {
                let li = document.createElement('li');
                li.textContent = follower.name;
                followingList.append(li);
            })
        } else {
            alert("Your email/username has not been found!");
        }
    })
}
function statusEvent(){
    let h4 = document.querySelector('h4#status');
    h4.addEventListener('click', function(e){
        currentUser.status = !currentUser.status;
        fetch(`http://localhost:3000/users/${currentUser.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentUser)
        })
        .then(res => res.json())
        .then(user => {
            h4.textContent = `Status: ${userStatus(user.status)}`;
        });
    })
}
function mainDivEvent(){
    mainDiv.addEventListener('click', function(e){
        if(e.target.matches('img.game-image')){
            let currentGameId = e.target.dataset.id
            fetch(`http://localhost:3000/games/${currentGameId}`)
            .then(res => res.json())
            .then(game => {
                currentGame = game;
                let reviews = currentGame.user_games;
                mainDiv.innerHTML = `
                <div class="single-game-div">
                    <div class="single-game">
                        <h1>Title: ${currentGame.name}</h1>
                        <h2>Genre: ${currentGame.genre}</h2>
                        <img src="${currentGame.image}" class="single-game-image" alt="${currentGame.name}">
                    </div>
                    <div class="single-game-add">    
                        <form id="add-to-my-list">
                            <h4>Add this game to my list:</h4>
                            <input type="hidden" id="user_id" name="user_id" value="${currentUser.id}">
                            <input type="hidden" id="game_id" name="game_id" value="${currentGame.id}">
                            <label for="username"> Username: </label>
                            <input type="text" id="username" name="username" placeholder="Enter Username for game"><br>
                            <label for="rating"> Rating: </label>
                            <input type="number" id="rating" name="rating" placeholder="Enter Rating 0-5"><br>
                            <label for="review"> Review: </label>
                            <input type="text" id="review" name="review" placeholder="Enter Review"><br>
                            <input type="submit" value="Add To My List">
                        </form>
                    </div>
                    <div class="single-game-badges">    
                        <h1>Badges: </h1>
                        <div class="single-game-badge-list">
                        </div>
                    </div>
                    <div class="single-game-reviews">
                        <h1> Reviews/Ratings: </h1>
                        <ul class="review-rating-list">
                        </ul>
                    </div>
                </div>
                `;
                let badgeList = document.querySelector('div.single-game-badge-list');
                currentGame.badges.forEach(badge => {
                    let div = document.createElement('div');
                    div.className = "single-badge-div";
                    let img = document.createElement('img');
                    img.src = badge.image;
                    div.append(img);
                    badgeList.append(div);
                })
                let reviewUl = document.querySelector('ul.review-rating-list');
                reviews.forEach(review => {
                    let li = document.createElement('li');
                    li.textContent = review.review;
                    let p = document.createElement('p');
                    p.textContent = `Rating: ${review.rating}/5 - ${review.username}`;
                    li.append(p)
                    reviewUl.append(li);
                })
                addToList();
            })
        } else if (e.target.matches('img.user-image')){
            let selectedUserId = e.target.dataset.id;
            // console.log(selectedUserId)
            mainDiv.innerHTML = "";
            fetch(`http://localhost:3000/users/${selectedUserId}`)
            .then(res => res.json())
            .then(user => {
                selectedUser = user;
                if (currentUser.id === selectedUser.id){
                    mainDiv.innerHTML = `
                    <div class="user-show-info">
                        <div class"user-show-info-div">
                            <h1 id='name'>Name: ${selectedUser.name}</h1><br>
                            <h2 id='email'>Email: ${selectedUser.email}</h2><br>
                            <h2 id='username'>Username: ${selectedUser.username}</h2><br>
                            <h3 id='age'>Age: ${selectedUser.age}</h3><br>
                            <h3 id='location'>Location: ${selectedUser.location}</h3><br>
                            <h4 id='status'>Status: ${userStatus(selectedUser.status)}</h4>
                            <div class="user-profile-pic">
                                <img src='${selectedUser.image}' alt="${selectedUser.name}'s picture" id='image' width=200 height=200>
                            </div>
                        </div>
                        <div class="user-following">
                            <h1>Following:</h1>
                            <ul class="single-user-following">
                            </ul>
                        </div>
                        <div class="user-game-list">
                            <h1>Game List: </h1>
                            <ul id= "user-game-list">
                            </ul>
                        </div>
                        <div class="user-badge-list">
                            <h1>Badge List: </h1>
                            <ul id= "user-badge-list">
                            </ul>
                        </div>
                    </div>
                    `;
                    let selectedUserGameList = document.querySelector('ul#user-game-list');
                    let selectedUserBadgeList = document.querySelector('ul#user-badge-list');
                    let selectedUserFollowingList = document.querySelector('ul.single-user-following');
                    selectedUser.games.forEach(game => {
                        let li = document.createElement('li');
                        li.textContent = game.name;
                        selectedUserGameList.append(li);
                    })
                    selectedUser.badges.forEach(badge => {
                        let li = document.createElement('li');
                        li.textContent = badge.name;
                        selectedUserBadgeList.append(li);
                    })
                    selectedUser.followees.forEach(follower => {
                        let li = document.createElement('li');
                        li.textContent = follower.name;
                        selectedUserFollowingList.append(li);
                    })
                } else {
                    mainDiv.innerHTML = `
                    <div class="user-show-info">
                        <div class"user-show-info-div">
                            <h1 id='name'>Name: ${selectedUser.name}</h1><br>
                            <h2 id='email'>Email: ${selectedUser.email}</h2><br>
                            <h2 id='username'>Username: ${selectedUser.username}</h2><br>
                            <h3 id='age'>Age: ${selectedUser.age}</h3><br>
                            <h3 id='location'>Location: ${selectedUser.location}</h3><br>
                            <h4 id='status'>Status: ${userStatus(selectedUser.status)}</h4>
                            <div class="user-profile-pic">
                                <img src='${selectedUser.image}' alt="${selectedUser.name}'s picture" id='image' width=200 height=200>
                            </div>
                            <form id="follow-selected-user">
                                <input type="hidden" id="follower_id" name="follower_id" value="${currentUser.id}">
                                <input type="hidden" id="followee_id" name="followee_id" value="${selectedUser.id}">
                                <input type="submit" value="Follow">
                            </form>
                        </div>
                        <div class="user-following">
                            <h1>Following:</h1>
                            <ul class="single-user-following">
                            </ul>
                        </div>
                        <div class="user-game-list">
                            <h1>Game List: </h1>
                            <ul id= "user-game-list">
                            </ul>
                        </div>
                        <div class="user-badge-list">
                            <h1>Badge List: </h1>
                            <ul id= "user-badge-list">
                            </ul>
                        </div>
                    </div>
                    `;
                    let selectedUserGameList = document.querySelector('ul#user-game-list');
                    let selectedUserBadgeList = document.querySelector('ul#user-badge-list');
                    let selectedUserFollowingList = document.querySelector('ul.single-user-following');
                    let followBtn = document.querySelector('form#follow-selected-user');
                    selectedUser.games.forEach(game => {
                        let li = document.createElement('li');
                        li.textContent = game.name;
                        selectedUserGameList.append(li);
                    })
                    selectedUser.badges.forEach(badge => {
                        let li = document.createElement('li');
                        li.textContent = badge.name;
                        selectedUserBadgeList.append(li);
                    })
                    selectedUser.followees.forEach(follower => {
                        let li = document.createElement('li');
                        li.textContent = follower.name;
                        selectedUserFollowingList.append(li);
                    })
                    followBtn.addEventListener('submit', function(e){
                        e.preventDefault();
                        let followerId = e.target.follower_id.value;
                        let followeeId = e.target.followee_id.value;
                        let newFriendship = {
                            follower_id: followerId,
                            followee_id: followeeId
                        }
                        fetch('http://localhost:3000/friendships',{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newFriendship)
                        })
                        .then(res => res.json())
                        .then(friendship => {
                            console.log(friendship)
                            let myFollowing = document.querySelector('ul.following')
                            let li = document.createElement('li');
                            li.textContent = selectedUser.name;
                            myFollowing.append(li);
                        })
                    })
                }
            })
        } else if (e.target.matches('img.badge-image')){
            let selectedBadgeId = parseInt(e.target.dataset.id);
            mainDiv.innerHTML = "";
            fetch(`http://localhost:3000/badges/${selectedBadgeId}`)
            .then(res => res.json())
            .then(badge => {
                selectedBadge = badge;
                fetch(`http://localhost:3000/users/${currentUser.id}`)
                .then(res => res.json())
                .then(user => {
                    currentUser = user;
                })
                let uGList = [];
                currentUserGameList = currentUser.user_games;
                currentUserGameList.forEach(userGame => uGList.push(userGame.game_id))
                if (uGList.includes(badge.game_id)){
                    mainDiv.innerHTML = `
                    <div class="single-badge-div">
                        <div class="single-badge-display">
                            <img src="${badge.image}">
                            <h1>${badge.name}</h1>
                            <h2></h2>
                            <h3>${badge.description}</h3>
                        </div>
                        <div id="new-badge-form">
                            <form id="add-new-badge-to-my-list">
                                <input type="hidden" id="user_id" name="user_id" value="${currentUser.id}">
                                <input type="hidden" id="badge_id" name="badge_id" value="${selectedBadge.id}">
                                <input type="submit" value="Add Badge">
                            </form>
                        </div>
                    </div>
                    `;
                    addToBadgeList();
                } else {
                    mainDiv.innerHTML = `
                    <div class="single-badge-div">
                        <div class="single-badge-display">
                            <img src="${badge.image}">
                            <h1>${badge.name}</h1>
                            <h2></h2>
                            <h3>${badge.description}</h3>
                        </div>
                    </div>

                    `;
                }
                let h2 = mainDiv.querySelector('h2');
                fetch(`http://localhost:3000/games/${badge.game_id}`)
                .then(res => res.json())
                .then(game => {
                    h2.textContent = game.name;
                })
                
            })
        }
    })
}
function addToList(){
    let addToListBtn = document.querySelector('form#add-to-my-list');
    addToListBtn.addEventListener('submit', function(e){
        e.preventDefault();
        let userId = e.target.user_id.value;
        let gameId = e.target.game_id.value;
        let username = e.target.username.value;
        let rating = e.target.rating.value;
        let review  = e.target.review.value;
        let newUserGame = {
            user_id: userId,
            game_id: gameId,
            username: username,
            rating: rating,
            review: review
        };
        // console.log(newUserGame)
        postNewUserGame(newUserGame);
        e.target.reset();
    })
}
function addToBadgeList(){
    let addToBadgeListBtn = document.querySelector('form#add-new-badge-to-my-list');
    addToBadgeListBtn.addEventListener('submit', function(e){
        e.preventDefault();
        let userId = e.target.user_id.value;
        let badgeId = e.target.badge_id.value;
        let newUserBadge = {
            user_id: userId,
            badge_id: badgeId
        }
        // console.log(newUserBadge)
        postNewUserBadge(newUserBadge)
        e.target.reset();
    })
}
function postNewUserGame(newUserGame){
    fetch('http://localhost:3000/user_games',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserGame),
    })
    .then(res => res.json())
    .then(data => {
        let reviewUl = document.querySelector('ul.review-rating-list');
        let reviewLi = document.createElement('li');
        reviewLi.textContent = data.review;
        let reviewP = document.createElement('p');
        reviewP.textContent = `Rating: ${data.rating} - ${data.username}`;
        reviewLi.append(reviewP);
        reviewUl.append(reviewLi);
        fetch(`http://localhost:3000/games/${newUserGame.game_id}`)
        .then(res => res.json())
        .then(game => {
            let userGameList = document.querySelector('ul#user-game-list');
            let li = document.createElement('li');
            li.dataset.id = data.id;
            li.textContent = game.name;
            let delBtn = document.createElement('button')
            delBtn.textContent = "Delete";
            li.append(delBtn);
            userGameList.append(li);
            delBtn.addEventListener('click', function(e){
                let liElem = e.target.parentElement;
                let liId = liElem.dataset.id;
                fetch(`http://localhost:3000/user_games/${liId}`,{
                    method: "DELETE",
                });
                userGameList.removeChild(liElem);
            })
        })
    })
}
function postNewUserBadge(newUserBadge){
    fetch('http://localhost:3000/user_badges',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserBadge),
    })
    .then(res => res.json())
    .then(data => {
        fetch(`http://localhost:3000/badges/${newUserBadge.badge_id}`)
        .then(res => res.json())
        .then(badge => {
            let userBadgeList = document.querySelector('ul#user-badge-list');
            let li = document.createElement('li');
            li.textContent = badge.name;
            userBadgeList.append(li);
        })
    })
}
function loadAllUsersToMainDiv(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(usersArr => {
        usersArr.forEach(user => {
            let div = document.createElement('div');
            div.className = "user-card";
            let img = document.createElement('img');
            img.className = "user-image";
            img.src = user.image;
            img.alt = user.name;
            img.dataset.id = user.id;
            div.append(img);
            mainDiv.append(div);
        })
    })
}
function loadAllBadgesToMainDiv(){
    fetch('http://localhost:3000/badges')
    .then(res => res.json())
    .then(badgesArr => {
        badgesArr.forEach(badge => {
            let div = document.createElement('div');
            div.className = "badge-card";
            let img = document.createElement('img');
            img.className = "badge-image";
            img.src = badge.image;
            img.alt = badge.name;
            img.dataset.id = badge.id;
            div.append(img);
            mainDiv.append(div);
        })
    })
}


