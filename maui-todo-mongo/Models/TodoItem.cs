using System;

namespace MauiTodoMongo.Models
{
    public class TodoItem
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }

        public TodoItem()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}