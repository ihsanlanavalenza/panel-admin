# Maui Todo Mongo

This project is a .NET MAUI application that manages a simple todo list using MongoDB as the backend database. 

## Features

- Add, update, and delete todo items.
- Mark todo items as completed.
- Store todo items in a MongoDB database.

## Project Structure

- **App.xaml**: Defines application-wide resources and styles.
- **App.xaml.cs**: Initializes the application and sets the main page.
- **MauiProgram.cs**: Configures application services and dependency injection.
- **Models/TodoItem.cs**: Represents a todo item with properties like `Id`, `Title`, `IsCompleted`, and `CreatedAt`.
- **Services/MongoDbService.cs**: Handles MongoDB connection and CRUD operations for todo items.
- **Repositories/TodoRepository.cs**: Interacts with `MongoDbService` for database operations.
- **ViewModels/MainViewModel.cs**: Manages the state and behavior of the main view.
- **Views/MainPage.xaml**: Defines the UI layout for the main page.
- **Views/MainPage.xaml.cs**: Code-behind for handling events in the main page.
- **Resources/Styles/Styles.xaml**: Contains styles and resources for the application.
- **Platforms/Android/AndroidManifest.xml**: Configuration for the Android platform.
- **Platforms/iOS/Info.plist**: Configuration for the iOS platform.
- **Platforms/Windows/Package.appxmanifest**: Configuration for the Windows platform.
- **appsettings.json**: Contains application configuration settings, including database connection strings.
- **MauiTodoMongo.csproj**: Project file defining the structure and dependencies.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/maui-todo-mongo.git
   ```

2. Navigate to the project directory:
   ```
   cd maui-todo-mongo
   ```

3. Install the required dependencies:
   ```
   dotnet restore
   ```

4. Update the `appsettings.json` file with your MongoDB connection string.

5. Run the application:
   ```
   dotnet run
   ```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.