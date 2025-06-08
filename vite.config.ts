import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})



/*
I want to create a Todo App in this app using Tailwind CSS and shadcn/ui.
Tailwind CSS and shadcn/ui are already installed in this app.
The ToDo should look like this:
'''
id: number;
title: string;
description: string;
status: "todo" | "in-progress" | "done";
dueDate:  Date;
difficulty: "Easy" | "Medium" | "Hard";
priority: "Low" | "Medium" | "High";
'''
I want to have a header with a logo on left side and two member links on right side one being home and other being Manage ToDos.
I want to have two pages:
Home: A simple landing page with gradient background, with text "Everything you need to manage you daily tasks in one place".
A get started button and followed by 3 cards that shows feature for this app.
Manage: This page will be divided into two halves (left and right).
The left side will have a form with all of the above fields with status,difficulty,priority and being shadcn dropdown and rest of the fields should be displayed as per the todo using shadcn ui only.
The right side will be a rendering list in the form of shadcn card ui, and each should be very good looking.This should also have two icons i.e. edit(pencil) and delete(dustbin) on each card. we can use formData state variable to manage form data.
I also want to have a footer on this app.

NOTE: custom hooks to manage todos.*/