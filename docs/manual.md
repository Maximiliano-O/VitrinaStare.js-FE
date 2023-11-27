# StArE.js Platform Manual

This is the general overview document of the StAre.js Platform.

## Sidebar


The user's name will be displayed in the sidebar if the user is registered. If the user is not registered, the displayed name will be “Guest”.

The sidebar contains the following buttons:


| Sidebar Button | Description |
| --- |  --- |
| Repositories | Redirects to the overview of published repositories |
| Users | Redirects to the list of users registered on the platform |
| My profile |  Redirects the user to their profile (Only shown if the user has logged in, not visible to guest users) |
| What is StarE? |   Redirects the user to the information view about StArE.js |
| Login |   Redirects the user to the login modal. (Only displayed if the user has not logged in) |
| Log off |   Close the user session. (Only shown if the user has logged in) |




## Repositories View


### General Repository View (Main Screen)

On the main screen, the user will be able to see all the repositories published on the platform.

In this view the user can do the following actions:

| Action | Description |
| --- |  --- |
| Select Repository | Redirects to the Repository Detail View of that specific repository  |
| Search Repository by Title | Filters the repository according to what is typed in the search bars  (Filters as the same time as the "Filter by Tags") |
| Filter by Tags | Filters the repository according to the selected tags  (Filters as the same time as "Search Repository by Title") |
| Sort Repositories | Changes the order of the displayed repositories, can be in ascending or descending order|
| Register a Repository | Redirects to the Register a Repository View (Only visible if the user is logged in) |



### Register Repository View


This is the screen in which the guest user will be able to register a repository. There are some required fields which are denoted on the view.

In the case of the Github repository URL, the platform verifies that the URL corresponds to an existing Github repository. It also verifies that said repository was uploaded to github by the user currently browsing the platform. If it is not valid, the user is notified and the repository registration will not proceed.


### Repository Detail View

This screen shows information of the selected repository.

In this view the user can do the following:


| Sidebar Button | Description |
| --- |  --- |
| Add Release | Redirect to the Add Release View (Only visible is the logged in user is the author of the repository, more details on <code>releasesAndVerification.md</code>) |
| View Relase | View the list of releases of the specific repository |
| Run Release| Run inside a CodeSandbox a specific release of the repository |
| Verify Release | Approve or reject a specific release of the repository (Only accessible if the user was one of the selected verfiers of that release) |
| Rate Publication |  Lets the user rate the repository between 1 and 5 |
| Comment Publication |   Lets the user leave a comment of a specific repository |



### Edit Repository View

This view is similar to registering a user, only with fewer fields.

Here the user can modify certain fields associated with their account.


## Users View


### General User View

In the general user overview, the user will be able to see all the users registered on the platform.

Above the list of users is the button to register. (Only displayed if the user has not logged in)

When you click on any user, you are redirected to the detail view of the specific User,

### User Registration View

This is the screen in which the guest user will be able to register. There are some required fields which are denoted which are marked in the view.


In the case of the Github profile URL, the platform verifies that that URL corresponds to an existing Github profile. If it is not valid, the user is notified and the registration will not proceed.



### User Detail View

This screen shows some information of the selected user.

The repositories registered by the selected user are also displayed, similar to the general view of repositories, filtered to only show those of the user in question.

In the event that a logged-in user is viewing details about themselves, the text “My Account” is displayed in the upper corner, and the “Edit Profile” button is displayed.

### Edit User View

This view is similar to registering a user, only with fewer fields.

Here the user can modify certain fields associated with their account.


## About StArE.js View


On this screen, the user will be able to see information about StArE.js, links to the StArE.js website and its Github repository are also provided.

Here the user will be able to select the language. Currently, the English and Spanish options are presented, leaving the possibility of adding more languages in the future.



