using Microsoft.Maui.Controls;
using System;

namespace MauiTodoMongo
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            MainPage = new NavigationPage(new Views.MainPage());
        }
    }
}