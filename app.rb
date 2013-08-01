Dir['./config/**/*.rb'].each { |f| require f }
Dir['./lib/**/*.rb'].each { |f| require f }

require 'sinatra'

get '/' do
  haml :index
end
