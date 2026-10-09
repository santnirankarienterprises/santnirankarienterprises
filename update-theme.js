const fs = require('fs');
const files = [
  'components/candidate/profile-step-2.tsx',
  'components/candidate/profile-step-3.tsx'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className=\{\`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-900 \$\{\s*errors\?\.[a-zA-Z]+\s*\? "border-red-500"\s*: "border-zinc-300 dark:border-zinc-700"\s*\}\`\}/g, (match) => {
    return match
      .replace('bg-white px-3', 'bg-white/50 px-3')
      .replace('focus:border-black focus:ring-2 focus:ring-zinc-300', 'focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none')
      .replace('dark:bg-zinc-900', 'dark:bg-zinc-900/50')
      .replace(': "border-zinc-300 dark:border-zinc-700"', ': "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"');
  });
  fs.writeFileSync(file, content);
});
console.log('Done');
