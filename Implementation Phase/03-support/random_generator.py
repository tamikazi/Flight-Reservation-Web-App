import datetime
import random

# List of popular cities for origin and destination
popular_cities = [
    'New York', 'Los Angeles', 'Paris', 'London', 'Tokyo', 'Calgary',
    'Vancouver', 'Toronto', 'Montreal', 'San Francisco', 'Chicago'
]

aircraft_details = [
        ('A310', 6, 13),
        ('B787', 9, 16),
        ('B773', 4, 11),
        ('B788', 6, 19),
        ('C212', 6, 10)
]

# Function to generate random departure times
def generate_random_departure_time():
    # Generating random departure times within a range (for demo purposes)
    hour = random.randint(7, 19)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"{hour:02d}:{minute:02d}:{second:02d}"

# Function to generate flights for each aircraft with varying departure times, origin, and destination
def generate_flights_for_aircraft():

    flights = []
    current_date = datetime.date(2023, 11, 20)  # Starting date for flights

    for aircraft in aircraft_details:
        model, num_cols, num_rows = aircraft
        flight_code = f'{model[:2]}{100 + len(flights)}'  # Generating a unique flight code
        origin = random.choice(popular_cities)
        destination = random.choice(popular_cities)
        while destination == origin:  # Ensure origin and destination are different
            destination = random.choice(popular_cities)

        depart_date = current_date.strftime('%Y-%m-%d')
        depart_time = generate_random_departure_time()  # Generating a random departure time

        flight_insert_statement = f"('{flight_code}', '{origin}', '{destination}', '{depart_date}', '{depart_time}', '{model}')"
        flights.append(flight_insert_statement)

        # Incrementing the date for the next flight (for demo purposes, you might want to adjust this logic)
        current_date += datetime.timedelta(days=1)

    return flights

#Generating flights for each aircraft with varying departure times, origin, and destination
# all_flights = generate_flights_for_aircraft()

# # Generating the final SQL statement
# insert_into_statement = "INSERT INTO FLIGHT (code, origin, destination, departDate, departTime, aircraft) VALUES "

# values_string = ', '.join(all_flights)
# final_insert_statement = f"{insert_into_statement}{values_string};"

# print(final_insert_statement)

aircraft_seats = [
    (1, 6, 13),
    (2, 9, 16),
    (3, 4, 11),
    (4, 6, 19),
    (5, 6, 10)
]


def generate_seat():

    values_list = []

    for aircraft in aircraft_seats:
        aircraftID, num_cols, num_rows = aircraft

        for row in range(1, num_rows + 1):
            for col in range(1, num_cols + 1):
                seat_number = f"{chr(64 + col)}{row}"
                seat_class = 'Business' if row == 1 else ( 'Comfort' if row == 2 else 'Economy')
                values_list.append(f"({aircraftID}, '{seat_number}', '{seat_class}')")

    values_string = ',\n'.join(values_list)
    insert_statement = f"INSERT INTO SEAT (aircraftID, seatNumber, class) VALUES {values_string};"

    return insert_statement

# Generating a single INSERT INTO statement for seat combinations for all flights
seat_insert_statement = generate_seat()

# Printing the generated INSERT INTO statement for seats
print(seat_insert_statement)