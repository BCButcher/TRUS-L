
async function renderPage(agent_id) {
    // console.log("biddetails " + bidId);
    generateDisplayName();

    // Generate a title
    let agent = await getAgentWithId(agent_id);
    let review = await getReviews(agent_id);
    let rows = review.map( (row) => {return row.stars;});
    let starsAverage = getStarsAverage(rows);
    let stars = getStars(starsAverage);  
    let starsExplanation = " out of 5";
    if(isNaN(starsAverage)) {
      starsExplanation = "";
    }
  
    $('#name').append(
        `<div class="card border-left-0 border-right-0 mt-3">
            <h5>${agent[0].first_name} ${agent[0].last_name}</h5>
            <div class="d-flex w-100 justify-content-between">
              <small class="text-success font-weight-bold">Average Rating ${stars} (${starsAverage}${starsExplanation}) </small>
            </div>
          </div>
        `
    );

    const reviewRows = await getReviewRows(agent_id);
    $('#reviews').append(reviewRows);
}

$( document ).ready(async function() {
    // '/biddetails?id=3
    // Only one query parameter is expected in this URL, the bid id

    // Array(6) ["id", "1", "name", "foo", "address", "123%20Main%20St"]
    // In this page, we expect id=num, so get the value in the second position
    let ids = getParam(); // getParam is defined in common.js
    generateLoginLogout();

    renderPage(ids[1]); 
  });
