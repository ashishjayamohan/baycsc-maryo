module.exports = {
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'open': {
    description: 'Opens a new open topic.',
    format: 'open <message>'
  },
  'say': {
    aliases: ['repeat', 'says'],
    description: 'Repeats whatever you say.',
    format: 'say <message>'
  }
}