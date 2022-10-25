import { treeData } from './utils/store';
import parser from './parser.js';


// const data = {
//   name: 'App',
//   state: {
//     person: {
//       name: 'Todo List',
//       age: 20,
//       description: `Let's get play!`,
//     },
//   },
//   children: [
//     {
//       name: 'Header',
//       children: [
//         {
//           name: 'Title',
//           props: { title: 'Header', item: 'To do app!' },
//           state: { title: 'Todo', item: 'What will you do each day' },
//         },
//       ],
//       props: {
//         name: 'Todo List',
//         age: 20,
//         description: `Let's get play!`,
//       },
//     },
//     {
//       name: 'TodoList',
//       props: {
//         item: { text: 'Write my first post1', status: true },
//         todoList: [
//           { text: 'Write my first post', status: true },
//           { text: 'Upload the post to the blog', status: false },
//           { text: 'Publish the post at Facebook', status: false },
//         ],
//       },
//       state: {
//         newItem: 'Work on OSP!!',
//       },
//       children: [
//         {
//           name: 'ListItem',
//           props: {
//             item: { text: 'Publish the post at Facebook', status: true },
//             todoList: [
//               { text: 'Write my first post', status: true },
//               { text: 'Upload the post to the blog', status: false },
//               { text: 'Publish the post at Facebook', status: true },
//               { text: 'Post at somethingggggg', status: false },
//             ],
//             index: 0,
//           },
//         },
//         {
//           name: 'ListItem',
//           props: {
//             item: { text: 'Upload the post to the blog3', status: false },
//             todoList: [
//               { text: 'Write my first post', status: true },
//               { text: 'Upload the post to the blog', status: false },
//               { text: 'Publish the post at Facebook', status: false },
//               { text: 'Publish the post at Twitter', status: false },
//             ],
//             index: 1,
//           },
//         },
//         {
//           name: 'ListItem',
//           props: {
//             item: { text: 'Publish the post at Facebook', status: false },
//             todoList: [
//               { text: 'Write my first post', status: true },
//               { text: 'Upload the post to the blog', status: false },
//               { text: 'Publish the post at Facebook', status: false },
//             ],
//             index: 2,
//           },
//         },
//       ],
//     },
//   ],
// };

async function updateComponentData() {
  
}

treeData.update((tree) => {
  tree.initData = {name: '<App />'};
  return tree;
});
