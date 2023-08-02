const { BlogPost } = require('../');

const blogData = [
  {
    user_id: 4,
    post_title: "lorem post unum blogo",
    post_content: 'Pellentesque quis maximus enim, at vehicula risus. Morbi in varius est. Quisque eget risus consequat nisl accumsan ornare. Morbi rhoncus tristique lorem, sit amet elementum sapien ultricies vitae. Sed magna sapien, eleifend ac leo a, congue eleifend sapien. Nulla id imperdiet mauris. Vestibulum sit amet nulla purus. In hac habitasse platea dictumst. Praesent sed nibh convallis ipsum auctor tristique. Donec volutpat neque eu lorem mattis blandit.',

  },
  {
    user_id: 3,
    post_title: "Ham Town blog post",
    post_content: `Today I went to Ham Town. I haven't been since I was a wee lad. The ham was pungent and the town was hammy. I had a ham sandwich and a ham shake. I bought a ham hat and a ham shirt. I went to the ham museum and saw the ham statue. I went to the ham store and bought a ham. I went to the ham park and saw the ham. I went to the ham library and read a ham book. I went to the ham school and learned about ham. I went to the ham hospital and got a ham transplant. I went to the ham jail and got arrested for ham. I went to the ham court and got sentenced to ham. I went to the ham prison and served my ham sentence. I went to the ham graveyard and died. I went to the ham heaven and saw the ham god. I went to the ham hell and saw the ham devil. I went to the ham purgatory and saw the ham purgator. I went to the ham limbo and saw the ham limbo. I went to the ham void and saw the ham void. I went to the ham nothing and saw the ham nothing. I went to the ham everything and saw the ham ev (this post has been truncated for length and was generated with GitHub Copilot)`,

  },
  {
    user_id: 2,
    post_title: "lorem post unum blogo",
    post_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis tortor eu orci hendrerit imperdiet. Ut vitae libero fermentum, euismod turpis quis, eleifend ex. Nam maximus volutpat est fermentum blandit. Nullam luctus dolor in enim iaculis lacinia vitae non magna. Nam nec mi id orci convallis ultrices et ultricies purus. Fusce non tincidunt ex. Donec gravida sapien in est lobortis, ac rhoncus turpis commodo. Mauris sed suscipit lacus. Sed egestas arcu feugiat, dignissim risus in, gravida velit. Maecenas vehicula commodo velit, luctus vulputate justo facilisis sed.',

  },
  {
    user_id: 1,
    post_title: "lorem post unum blogo",
    post_content: 'Phasellus iaculis erat a ultrices lobortis. Praesent convallis nisl ullamcorper, viverra est vel, placerat arcu. Fusce nec accumsan lorem, vel porta nisi. Praesent justo metus, maximus pharetra lectus in, hendrerit tempor tortor. Nam mauris dolor, viverra et metus sit amet, eleifend vehicula purus. Curabitur ut orci neque. Quisque sapien justo, congue a enim id, egestas laoreet lectus. Aliquam erat volutpat. Aenean et libero non lorem volutpat consectetur sit amet vitae felis. Nunc risus turpis, semper ut dignissim nec, rutrum placerat massa. Mauris porttitor ipsum est, non consectetur dui porta et. Morbi ac mauris sollicitudin, malesuada dui et, finibus risus.',

  },
  {
    user_id: 5,
    post_title: "what is lorem ipsum?",
    post_content: 'I forgor what lorem ipsum is',

  },
  {
    user_id: 3,
    post_title: "why he do that?",
    post_content: 'Yesterday, at the airport, I saw a man sniffing suitcases.',

  },
];

const blogSeeds = () => BlogPost.bulkCreate(blogData);

module.exports = blogSeeds;
