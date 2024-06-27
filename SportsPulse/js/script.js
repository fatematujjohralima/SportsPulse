/* =================================== 
      Fetch All Player 
      ================================*/
const loadAllPlayer = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p")
    .then((response) => response.json())
    .then((data) => {
      displayPlayerData(data.player);
    });
};

// Avater url
const playerAvater = "https://i.ibb.co/XbhCdtG/rsz-man.jpg";

/* =================================== 
      Display all player
      ================================*/
const displayPlayerData = (playersData) => {
  const playerContaine = document.getElementById("player_container");

  // Limit product
  // const limitedPlayersData = playersData.slice(0, 11);

  playersData.forEach((player) => {
    console.log(player);

    const div = document.createElement("div");
    div.classList.add("card", "col-lg-4", "col-md-6", "col-12", "mb-1");

    // Limit description to 12 words
    const limitDescription = player.strDescriptionEN
      ? player.strDescriptionEN.split(" ").slice(0, 12).join(" ")
      : "No description available";

    // Social media links
    const facebookLink = player?.strFacebook
      ? `<a href="https://${player.strFacebook}" target="_blank"><i class="fa-brands fa-facebook fa-2x"></i></a>`
      : '<i class="fa-brands fa-facebook fa-2x"></i>';
    const instagramLink = player?.strInstagram
      ? `<a href="https://${player.strInstagram}" target="_blank"><i class="fa-brands fa-square-instagram fa-2x"></i></a>`
      : '<i class="fa-brands fa-square-instagram fa-2x"></i>';
    const twitterLink = player?.strTwitter
      ? `<a href="https://${player.strTwitter}" target="_blank"><i class="fa-brands fa-twitter fa-2x"></i></a>`
      : '<i class="fa-brands fa-twitter fa-2x"></i>';

    div.innerHTML = `
        <div class="card">
            <img src=${
              player.strThumb ? player.strThumb : playerAvater
            } class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <p class="card-text">Nationality: ${player?.strNationality}</p>
                <p class="card-text">Team: ${player?.strTeam}</p>
                <p class="card-text">Sports: ${player?.strSport}</p>
                <p class="card-text">Gender: ${player?.strGender}</p>
                <p class="card-text">Description: ${limitDescription}</p>
                <span class="d-flex justify-content-center align-items-center gap-3 my-3">
                  ${facebookLink}
                  ${instagramLink}
                  ${twitterLink}
                </span>
                <div class="d-flex gap-2">
                    <button onclick="handleAddToGroup(this, '${
                      player?.strPlayer
                    }')" type="button" class="btn btn-sm btn-secondary">Add to group</button>

                    <button onclick=handleViewDetails('${
                      player?.idPlayer
                    }') type="button" class="btn btn-sm btn-secondary" id="modal_view" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button>

                    
                </div>
            </div>
        </div>
        `;

    playerContaine.appendChild(div);
  });
};

/* =================================== 
      Handle handleAddToGroup 
      ================================*/
let count = 0;

const cartContainer = document.getElementById("group_member_add");
const cartDiv = document.createElement("div");
cartDiv.innerHTML = `
<div class="card" style="width: 18rem;">
<div class="card-header" id="total_member_count">
  Total added member: ${count}
</div>
<ul class="list-group list-group-flush" id="member_cart">
  
</ul>
</div>
`;
cartContainer.appendChild(cartDiv);

const handleAddToGroup = (btn, info) => {
  // Limit to max 11 item
  if (count >= 11) {
    alert("Maximum limit (11) reached for group members.");
    return;
  }

  const addMemberContainer = document.getElementById("member_cart");

  const div = document.createElement("div");

  div.innerHTML = `
    <li class="list-group-item">${info}</li>

  `;
  addMemberContainer.appendChild(div);
  count = count + 1;
  // Update the count in the card header
  document.getElementById(
    "total_member_count"
  ).innerText = `Total added member: ${count}`;

  // Disable the button
  btn.disabled = true;
};

/* =================================== 
      Handle View Details
      ================================*/
const handleViewDetails = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      showModal(data.players[0]);
    });
};

const showModal = (playerData) => {
  const modalBody = document.querySelector("#exampleModal .modal-body");
  modalBody.innerHTML = `
    <img src="${
      playerData.strThumb ? playerData.strThumb : playerAvater
    }" class="img-fluid rounded mb-3" alt="...">
    <h5>Name: ${playerData.strPlayer}</h5>
    <p>Date of birth: ${playerData.dateBorn}</p>
    <p>Nationality: ${playerData.strNationality}</p>
    <p>Gender: ${playerData.strGender}</p>
    <p>Team: ${playerData.strTeam}</p>
    <p>Sport: ${playerData.strSport}</p>
    <p>Position: ${playerData.strPosition}</p>
    <p>Description: ${playerData.strDescriptionEN}</p>
    
  `;
};

/* =================================== 
      Search Player 
      ================================*/
const searchPlayer = () => {
  const searchInput = document.getElementById("search-input").value.trim();
  console.log(searchInput);
  if (searchInput === "") {
    alert("Please enter a player name to search.");
    return;
  }

  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.player) {
        clearPlayerContainer();
        displayPlayerData(data.player);
      } else {
        alert("No players found with that name.");
        document.getElementById("player_container").innerHTML = ""; // Clear the container
      }
    });
};

// Function to clear player_container
const clearPlayerContainer = () => {
  const playerContainer = document.getElementById("player_container");
  playerContainer.innerHTML = "";
};

loadAllPlayer();
