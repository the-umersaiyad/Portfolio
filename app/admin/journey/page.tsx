            <SubmitButton 
              label={eventToEdit ? "Update Event" : "Add Event"} 
              icon={eventToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
            />
          </div>
        </form>
      </div>

      <JourneyList initialEvents={events} />
    </div>
  );
}
