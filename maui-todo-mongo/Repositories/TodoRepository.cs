using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using maui_todo_mongo.Models;

namespace maui_todo_mongo.Repositories
{
    public class TodoRepository
    {
        private readonly MongoDbService _mongoDbService;

        public TodoRepository(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        public async Task<List<TodoItem>> GetAllTodoItemsAsync()
        {
            return await _mongoDbService.TodoItems.Find(_ => true).ToListAsync();
        }

        public async Task<TodoItem> GetTodoItemByIdAsync(string id)
        {
            return await _mongoDbService.TodoItems.Find(item => item.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateTodoItemAsync(TodoItem todoItem)
        {
            await _mongoDbService.TodoItems.InsertOneAsync(todoItem);
        }

        public async Task UpdateTodoItemAsync(string id, TodoItem updatedTodoItem)
        {
            await _mongoDbService.TodoItems.ReplaceOneAsync(item => item.Id == id, updatedTodoItem);
        }

        public async Task DeleteTodoItemAsync(string id)
        {
            await _mongoDbService.TodoItems.DeleteOneAsync(item => item.Id == id);
        }
    }
}