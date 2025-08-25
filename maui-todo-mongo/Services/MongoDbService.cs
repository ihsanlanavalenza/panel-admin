using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace maui_todo_mongo.Services
{
    public class MongoDbService
    {
        private readonly IMongoCollection<TodoItem> _todoItems;

        public MongoDbService(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _todoItems = database.GetCollection<TodoItem>("TodoItems");
        }

        public async Task<List<TodoItem>> GetTodoItemsAsync()
        {
            return await _todoItems.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<TodoItem> GetTodoItemAsync(string id)
        {
            return await _todoItems.Find(todo => todo.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateTodoItemAsync(TodoItem todoItem)
        {
            await _todoItems.InsertOneAsync(todoItem);
        }

        public async Task UpdateTodoItemAsync(string id, TodoItem todoItem)
        {
            await _todoItems.ReplaceOneAsync(todo => todo.Id == id, todoItem);
        }

        public async Task DeleteTodoItemAsync(string id)
        {
            await _todoItems.DeleteOneAsync(todo => todo.Id == id);
        }
    }
}