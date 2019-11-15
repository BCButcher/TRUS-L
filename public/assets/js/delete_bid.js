function generateButton() {
    let bidId = getParam()[1];
    let buttonRow = `
       <button type="button" class="btn btn-info btn-lg" id="viewbids" onclick="deleteBid(${bidId})">Delete</button>
    `;

    const buttonSection = $("#buttonSection").empty();
    buttonSection.append(buttonRow);
}

function deleteBid(bidId) {
    $.ajax({
        url: "/api/bid/" + bidId,
        method: "DELETE"
    }).then(function() {
        window.location.href='/dashboard';
    }).catch(function(err) {
        console.log(err);
    });

}

generateButton();
