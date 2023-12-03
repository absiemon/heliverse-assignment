# Full stack Application
This is a full-stack web application that allows users to view and interact with a list of users. The mock data for the users can be found at this link.
**The mock data for the users can be found at this link**
https://drive.google.com/file/d/1ibmr3WD7Jw6oLL6O_W390WojCLfCHw-k/view?usp=sharing. 

## The application has the following functionalities:
- **Users in cards format with pagination: The users has been displayed in a visually appealing card format. Implemented pagination to display 20 users per page.**
- **Search by Name: Users would be able to search for users by their names. As the user types in the search input, the list of displayed users would be dynamically updated to match the search query.**
- **Added 3 filters: Implemenedt three filters - Domain, Gender, and Availability. Users would be able to select multiple filters simultaneously, and the displayed user list would be updated accordingly.**
- **Create a team: Users would be able to create a team by selecting users from the list. Only users with unique domains and availability would be selectable for the team (similar to adding items to a cart in e-commerce websites).**
- **Show team details: Once the team is created, displaying the details of the team, including the selected users' information.**
- **Made it responsive: Ensured that the application is responsive and displays properly on different screen sizes.**


## Installation
1. Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/absiemon/heliverse-assignment.git
   ```
2. Naviagte to the client and server one by one and download the required node packages using the npm install command:

```bash
$ npm install
```
3. Create a .env file in the server directory of the application and add the following variables:
```bash
MONGO_URL= your mongoDB url
```
4. Start the backend by executing this command:
```bash
$ npm run dev
```
5. Start the frontend by executing this command:
```bash
$ npm start
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


