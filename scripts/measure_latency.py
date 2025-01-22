import sys
import ping3  # Library used to measure ping latency
import json  # For formatting the output as JSON

# Function to measure latency to a given host
def measure_latency(host):
    try:
        # Send a ping to the host with a timeout of 1 second
        latency = ping3.ping(host, timeout=1)
        
        # If no response, return packet loss information
        if latency is None:
            return {"latency": None, "packet_loss": True}
        
        # If a response is received, return the latency and packet loss as False
        return {"latency": latency, "packet_loss": False}
    except Exception as e:
        # If an error occurs, return the error message and packet loss as True
        return {"error": str(e), "packet_loss": True}

# Main block to run the function if executed directly
if __name__ == "__main__":
    # Get the host address from command line arguments
    host = sys.argv[1]
    
    # Call the measure_latency function and store the result
    result = measure_latency(host)
    
    # Print the result as a JSON formatted string
    print(json.dumps(result))
