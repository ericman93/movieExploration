require 'orientdb4r'

class OrientDb
	def initialize(config)
		@server = {
			:database => config["database"],
		    :user => config["user"],
		    :password => config["password"]
		}

		@client = Orientdb4r.client
	end

	def add_node(node)
		@client.connect @server
		
		puts "@#{node["title"]}@"
		unless node_exists? node["uniqueId"], node["type"]
			puts "indexing #{node["title"]}"
 			node['@class'] = node["type"]
			@client.create_document(node)
	 	end 
		
		@client.disconnect
	end

	def node_exists?(nodeId, className)
		count = @client.query "SELECT count(*) FROM #{className} where uniqueId = #{nodeId.to_s}"
		count[0]["count"] != 0
	end

	def add_edge(movieId, toId, toType, extra)
		@client.connect @server
		
		command = "CREATE EDGE movie#{toType} FROM (SELECT FROM movie WHERE uniqueId = #{movieId}) TO (SELECT FROM #{toType} WHERE uniqueId = #{toId})"
		unless extra.nil?
			command += " SET #{extra.map{|k,v| "#{k} = '#{v}'"}.join(',')}"
		end

		@client.command command
		
		@client.disconnect
	end
end