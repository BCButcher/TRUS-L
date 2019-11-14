
function displayListings() {
    const listingsList = $('#listings').empty();

    // AJAX Get call
    $.ajax({
        url: "/api/listing",
        method: "GET"
    }).then(function(listings) {
        if(listings.length == 0) {
            listingsList.appendTo(`<h3>No listings yet</h3>`);
        }
console.log(listings);
    for(const listing of listings) {
        const id = listings.id;
        $('.listingRow').append(
        `<br>
        <div class="list-group">
        <a href="/createbid" class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${listing.property_address}</h5>
      <small>${listing.listing_status}</small>
    </div>
    <li>${listing.type_of_home}</li>
    <li>${listing.estimated_value}</li>
    <small>${listing.poster_id}</small>
  </a>
  </div>
  `
  );
}
    }).catch(function(err) {
        console.log(err);
    })
}


$( document ).ready(function() {
    
   displayListings();
  });
  