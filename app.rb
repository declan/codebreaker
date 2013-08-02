Dir['./config/**/*.rb'].each { |f| require f }
Dir['./lib/**/*.rb'].each { |f| require f }

require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

get '/dashboard.html' do
  haml :dashboard, :layout => false
end

get '/new.html' do
  haml :new, :layout => false
end

get '/decode.html' do
  haml :decode, :layout => false
end

get '/*' do
  haml :decode
end
