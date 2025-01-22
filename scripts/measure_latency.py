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
            return {"host": host, "latency": None, "packet_loss": True}
        
        # If a response is received, return the latency and packet loss as False
        return {"host": host, "latency": latency, "packet_loss": False}
    except Exception as e:
        # If an error occurs, return the error message and packet loss as True
        return {"host": host, "error": str(e), "packet_loss": True}

# Main block to run the function if executed directly
if __name__ == "__main__":
    # Ensure at least two hosts are provided as command line arguments
    if len(sys.argv) < 3:
        print("Usage: python script.py <host1> <host2>")
        sys.exit(1)
    
    # Get the host addresses from command line arguments
    host1 = sys.argv[1]
    host2 = sys.argv[2]
    
    # Call the measure_latency function for both hosts
    result1 = measure_latency(host1)
    result2 = measure_latency(host2)
    
    # Combine the results into a single JSON object
    combined_results = {"results": [result1, result2]}
    
    # Print the combined results as a JSON formatted string
    print(json.dumps(combined_results, indent=4))
